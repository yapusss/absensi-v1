from datetime import timedelta
from functools import lru_cache
from uuid import uuid4

import bcrypt
from django.db import transaction
from django.http import JsonResponse
from django.utils import timezone
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_http_methods

from .models import (
    AccountLoginAttempt,
    AccountRole,
    AccountSession,
    AccountUser,
    CompanyAffiliation,
    LifecycleStatus,
)
from .serializers import CompanySelectionSerializer, LoginSerializer, RoleSelectionSerializer

SESSION_ACCOUNT_USER_ID = "account_user_id"
SESSION_LOGIN_IDENTIFIER = "login_identifier"
SESSION_ACTIVE_ROLE = "active_role"
SESSION_ACTIVE_COMPANY = "active_company"
SESSION_TRACKING_KEY = "account_session_key"
SESSION_TIMEOUT_SECONDS = 60 * 60 * 24


def _json_error(message: str, status: int) -> JsonResponse:
    return JsonResponse({"error": message}, status=status)


def _parse_json_body(request):
    try:
        import json

        return json.loads(request.body.decode("utf-8") or "{}"), None
    except (UnicodeDecodeError, ValueError):
        return None, _json_error("Invalid JSON body.", 400)


@lru_cache(maxsize=16)
def _lifecycle_status_id(applies_to: str, lifecycle_code: str):
    status = LifecycleStatus.objects.filter(applies_to=applies_to, lifecycle_code=lifecycle_code).only(
        "lifecycle_status_id"
    ).first()
    return status.lifecycle_status_id if status else None


def _client_ip(request) -> str | None:
    forwarded = request.META.get("HTTP_X_FORWARDED_FOR")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.META.get("REMOTE_ADDR")


def _record_login_attempt(
    login_identifier: str,
    is_success: bool,
    request,
    account_user: AccountUser | None = None,
) -> None:
    AccountLoginAttempt.objects.create(
        account_user=account_user,
        login_identifier=login_identifier,
        is_success=is_success,
        attempted_at=timezone.now(),
        ip_address=_client_ip(request),
        user_agent=request.META.get("HTTP_USER_AGENT"),
    )


def _authenticated_user(request) -> AccountUser | None:
    account_user_id = request.session.get(SESSION_ACCOUNT_USER_ID)
    if not account_user_id:
        return None
    return (
        AccountUser.objects.select_related("lifecycle_status")
        .filter(account_user_id=account_user_id, lifecycle_status__lifecycle_code="active")
        .first()
    )


@require_http_methods(["GET"])
def health_check(request):
    return JsonResponse({"status": "ok"})


@require_http_methods(["POST"])
@transaction.atomic
def auth_login(request):
    payload, error = _parse_json_body(request)
    if error:
        return error
    serializer = LoginSerializer(data=payload)

    if not serializer.is_valid():
        return _json_error("Missing or invalid login data.", 400)

    login_identifier = serializer.validated_data["login_identifier"]
    password = serializer.validated_data["password"]

    user = (
        AccountUser.objects.select_related("lifecycle_status")
        .filter(login_identifier=login_identifier)
        .first()
    )

    if user is None:
        _record_login_attempt(login_identifier=login_identifier, is_success=False, request=request, account_user=None)
        return _json_error("Invalid credentials.", 401)

    if user.lifecycle_status.lifecycle_code != "active":
        _record_login_attempt(login_identifier=login_identifier, is_success=False, request=request, account_user=user)
        return _json_error("Account is not active.", 401)

    try:
        password_ok = bcrypt.checkpw(password.encode("utf-8"), user.password_hash.encode("utf-8"))
    except ValueError:
        password_ok = False

    if not password_ok:
        _record_login_attempt(login_identifier=login_identifier, is_success=False, request=request, account_user=user)
        return _json_error("Invalid credentials.", 401)

    request.session.flush()
    request.session[SESSION_ACCOUNT_USER_ID] = str(user.account_user_id)
    request.session[SESSION_LOGIN_IDENTIFIER] = user.login_identifier
    request.session.set_expiry(SESSION_TIMEOUT_SECONDS)
    request.session[SESSION_TRACKING_KEY] = str(uuid4())

    active_session_status_id = _lifecycle_status_id("account_session", "active")
    if active_session_status_id is None:
        return _json_error("Missing lifecycle status configuration for account_session active.", 500)

    now = timezone.now()
    AccountSession.objects.create(
        account_user=user,
        session_key=request.session[SESSION_TRACKING_KEY],
        created_at=now,
        expires_at=now + timedelta(seconds=SESSION_TIMEOUT_SECONDS),
        lifecycle_status_id=active_session_status_id,
    )
    AccountUser.objects.filter(account_user_id=user.account_user_id).update(last_login_at=now, updated_at=now)
    _record_login_attempt(login_identifier=login_identifier, is_success=True, request=request, account_user=user)

    return JsonResponse(
        {
            "account_user_id": str(user.account_user_id),
            "login_identifier": user.login_identifier,
            "authenticated": True,
        },
        status=200,
    )


@require_http_methods(["POST"])
@transaction.atomic
def auth_logout(request):
    user = _authenticated_user(request)
    if user is None:
        return _json_error("Authentication required.", 401)

    session_key = request.session.get(SESSION_TRACKING_KEY)
    if session_key:
        non_active_status_id = _lifecycle_status_id("account_session", "non_active")
        updates = {"revoked_at": timezone.now()}
        if non_active_status_id is not None:
            updates["lifecycle_status_id"] = non_active_status_id
        AccountSession.objects.filter(session_key=session_key, account_user=user).update(**updates)

    request.session.flush()
    return JsonResponse({"success": True}, status=200)


@require_http_methods(["GET"])
@ensure_csrf_cookie
def auth_me(request):
    user = _authenticated_user(request)
    if user is None:
        return JsonResponse({"authenticated": False}, status=200)

    return JsonResponse(
        {
            "authenticated": True,
            "account_user_id": str(user.account_user_id),
            "login_identifier": user.login_identifier,
        },
        status=200,
    )


@require_http_methods(["GET"])
def context_get(request):
    user = _authenticated_user(request)
    if user is None:
        return _json_error("Authentication required.", 401)

    roles = list(
        AccountRole.objects.filter(account_user=user, is_active=True)
        .select_related("role")
        .values("role__role_code", "role__role_scope")
        .distinct()
    )
    role_items = [{"role_code": r["role__role_code"], "role_scope": r["role__role_scope"]} for r in roles]

    active_affiliation_status_id = _lifecycle_status_id("company_affiliation", "active")
    affiliation_qs = CompanyAffiliation.objects.filter(account_user=user).select_related("company")
    if active_affiliation_status_id is not None:
        affiliation_qs = affiliation_qs.filter(lifecycle_status_id=active_affiliation_status_id)

    companies = list(affiliation_qs.values("company__company_id", "company__company_name").distinct())
    company_items = [{"company_id": str(c["company__company_id"]), "company_name": c["company__company_name"]} for c in companies]

    active_role = request.session.get(SESSION_ACTIVE_ROLE)
    if active_role and active_role not in {r["role_code"] for r in role_items}:
        request.session.pop(SESSION_ACTIVE_ROLE, None)
        active_role = None

    active_company = request.session.get(SESSION_ACTIVE_COMPANY)
    if active_company and active_company not in {c["company_id"] for c in company_items}:
        request.session.pop(SESSION_ACTIVE_COMPANY, None)
        active_company = None

    return JsonResponse(
        {
            "roles": role_items,
            "active_role": active_role,
            "companies": company_items,
            "active_company": active_company,
        },
        status=200,
    )


@require_http_methods(["POST"])
def context_select_role(request):
    user = _authenticated_user(request)
    if user is None:
        return _json_error("Authentication required.", 401)

    payload, error = _parse_json_body(request)
    if error:
        return error

    serializer = RoleSelectionSerializer(data=payload)
    if not serializer.is_valid():
        return _json_error("Missing role_code.", 400)

    role_code = serializer.validated_data["role_code"]
    is_assigned = AccountRole.objects.filter(account_user=user, is_active=True, role__role_code=role_code).exists()
    if not is_assigned:
        return _json_error("Forbidden role selection.", 403)

    request.session[SESSION_ACTIVE_ROLE] = role_code
    return JsonResponse({"active_role": role_code}, status=200)


@require_http_methods(["POST"])
def context_select_company(request):
    user = _authenticated_user(request)
    if user is None:
        return _json_error("Authentication required.", 401)

    payload, error = _parse_json_body(request)
    if error:
        return error

    serializer = CompanySelectionSerializer(data=payload)
    if not serializer.is_valid():
        return _json_error("Missing company_id.", 400)

    company_id = serializer.validated_data["company_id"]
    active_affiliation_status_id = _lifecycle_status_id("company_affiliation", "active")
    affiliation_qs = CompanyAffiliation.objects.filter(account_user=user, company_id=company_id)
    if active_affiliation_status_id is not None:
        affiliation_qs = affiliation_qs.filter(lifecycle_status_id=active_affiliation_status_id)
    if not affiliation_qs.exists():
        return _json_error("Forbidden company selection.", 403)

    request.session[SESSION_ACTIVE_COMPANY] = str(company_id)
    return JsonResponse({"active_company": str(company_id)}, status=200)
