from rest_framework import serializers


class LoginSerializer(serializers.Serializer):
    login_identifier = serializers.CharField(max_length=255)
    password = serializers.CharField(max_length=255, trim_whitespace=False)


class RoleSelectionSerializer(serializers.Serializer):
    role_code = serializers.CharField(max_length=255)


class CompanySelectionSerializer(serializers.Serializer):
    company_id = serializers.UUIDField()
