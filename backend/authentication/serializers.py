from django.contrib.auth import authenticate

from rest_framework import serializers

from authentication.models import AuditLog


class LoginSerializer(serializers.Serializer):

    username = serializers.CharField()

    password = serializers.CharField(
        write_only=True
    )


    def validate(self, attrs):

        username = attrs.get("username")

        password = attrs.get("password")


        if not username or not password:

            raise serializers.ValidationError(
                "Username and password required."
            )


        user = authenticate(
            username=username,
            password=password
        )


        if not user:

            raise serializers.ValidationError(
                "Invalid credentials."
            )


        attrs["user"] = user

        return attrs
    
class AuditLogSerializer(
    serializers.ModelSerializer
):

    username = serializers.CharField(

            source="user.username",

            read_only=True
        )

    class Meta:

        model = AuditLog

        fields = [

            "id",

            "event",

            "username",

            "ip_address",

            "created_at",
        ]