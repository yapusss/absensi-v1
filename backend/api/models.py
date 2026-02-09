import uuid

from django.db import models


class LifecycleStatus(models.Model):
    lifecycle_status_id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    lifecycle_code = models.CharField(max_length=255)
    applies_to = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    is_terminal = models.BooleanField(default=False)

    class Meta:
        managed = False
        db_table = "lifecycle_status"


class AccountUser(models.Model):
    account_user_id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    login_identifier = models.CharField(max_length=255)
    password_hash = models.CharField(max_length=255)
    last_login_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    lifecycle_status = models.ForeignKey(
        LifecycleStatus,
        models.DO_NOTHING,
        db_column="lifecycle_status_id",
        related_name="account_users",
    )

    class Meta:
        managed = False
        db_table = "account_user"


class AccountSession(models.Model):
    account_session_id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    account_user = models.ForeignKey(
        AccountUser,
        models.DO_NOTHING,
        db_column="account_user_id",
        related_name="account_sessions",
    )
    session_key = models.CharField(max_length=255)
    created_at = models.DateTimeField()
    expires_at = models.DateTimeField()
    revoked_at = models.DateTimeField(blank=True, null=True)
    lifecycle_status = models.ForeignKey(
        LifecycleStatus,
        models.DO_NOTHING,
        db_column="lifecycle_status_id",
        related_name="account_sessions",
    )

    class Meta:
        managed = False
        db_table = "account_session"


class AccountLoginAttempt(models.Model):
    account_login_attempt_id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    account_user = models.ForeignKey(
        AccountUser,
        models.DO_NOTHING,
        db_column="account_user_id",
        related_name="login_attempts",
        blank=True,
        null=True,
    )
    login_identifier = models.CharField(max_length=255)
    is_success = models.BooleanField()
    attempted_at = models.DateTimeField()
    ip_address = models.CharField(max_length=255, blank=True, null=True)
    user_agent = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = "account_login_attempt"


class Role(models.Model):
    role_id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    role_code = models.CharField(max_length=255)
    role_scope = models.CharField(max_length=255)
    created_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = "role"


class AccountRole(models.Model):
    account_role_id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    account_user = models.ForeignKey(
        AccountUser,
        models.DO_NOTHING,
        db_column="account_user_id",
        related_name="account_roles",
    )
    role = models.ForeignKey(Role, models.DO_NOTHING, db_column="role_id", related_name="account_roles")
    is_active = models.BooleanField(default=True)
    assigned_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = "account_role"


class Company(models.Model):
    company_id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    company_name = models.CharField(max_length=255)
    company_code = models.CharField(max_length=255)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    lifecycle_status = models.ForeignKey(
        LifecycleStatus,
        models.DO_NOTHING,
        db_column="lifecycle_status_id",
        related_name="companies",
    )

    class Meta:
        managed = False
        db_table = "company"


class CompanyAffiliation(models.Model):
    company_affiliation_id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    account_user = models.ForeignKey(
        AccountUser,
        models.DO_NOTHING,
        db_column="account_user_id",
        related_name="company_affiliations",
    )
    company = models.ForeignKey(
        Company,
        models.DO_NOTHING,
        db_column="company_id",
        related_name="company_affiliations",
    )
    joined_at = models.DateTimeField()
    lifecycle_status = models.ForeignKey(
        LifecycleStatus,
        models.DO_NOTHING,
        db_column="lifecycle_status_id",
        related_name="company_affiliations",
    )

    class Meta:
        managed = False
        db_table = "company_affiliation"


class CompanyOwner(models.Model):
    company_owner_id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    company = models.ForeignKey(Company, models.DO_NOTHING, db_column="company_id", related_name="company_owners")
    account_user = models.ForeignKey(
        AccountUser,
        models.DO_NOTHING,
        db_column="account_user_id",
        related_name="owned_companies",
    )
    assigned_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = "company_owner"
