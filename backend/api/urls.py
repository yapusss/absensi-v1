from django.urls import path

from .views import (
    auth_login,
    auth_logout,
    auth_me,
    context_get,
    context_select_company,
    context_select_role,
    health_check,
)

urlpatterns = [
    path("health/", health_check, name="health-check"),
    path("auth/login", auth_login, name="auth-login"),
    path("auth/logout", auth_logout, name="auth-logout"),
    path("auth/me", auth_me, name="auth-me"),
    path("context", context_get, name="context-get"),
    path("context/select-role", context_select_role, name="context-select-role"),
    path("context/select-company", context_select_company, name="context-select-company"),
]
