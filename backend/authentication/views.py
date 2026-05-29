from django.shortcuts import render
from datetime import timedelta

from django.utils import timezone

from django.contrib.auth import authenticate

from rest_framework.permissions import (
    IsAuthenticated
)

from rest_framework.views import APIView

from rest_framework.response import Response

from rest_framework import status

from rest_framework_simplejwt.tokens import (
    RefreshToken
)

from .models import (
    UserProfile,
    AuditLog
)

from .serializers import LoginSerializer, AuditLogSerializer

from rest_framework import generics
from rest_framework.permissions import IsAdminUser

from authentication.services.audit_service import (
    create_audit_log
)




class LoginView(APIView):

    # No authentication required for login
    permission_classes = []


    def post(self, request):

        """
        Enterprise Login Flow

        1. Validate incoming payload
        2. Find user
        3. Check lockout status
        4. Authenticate credentials
        5. Track failed attempts
        6. Generate JWT tokens
        7. Create audit logs
        """

        serializer = LoginSerializer(
            data=request.data
        )

        # -----------------------------------
        # STEP 1 — Validate request payload
        # -----------------------------------
        if not serializer.is_valid():

            attempted_username = request.data.get(
                "username",
                "UNKNOWN"
            )

            # Create failed login audit log
            AuditLog.objects.create(

                event="login_failed",

                details={
                    "attempted_username":
                        attempted_username,

                    "errors":
                        serializer.errors,
                },

                ip_address=request.META.get(
                    "REMOTE_ADDR"
                ),

                user_agent=request.META.get(
                    "HTTP_USER_AGENT",
                    ""
                ),
            )

            return Response(

                {
                    "success": False,
                    "errors": serializer.errors
                },

                status=status.HTTP_400_BAD_REQUEST
            )

        username = serializer.validated_data[
            "username"
        ]

        password = serializer.validated_data[
            "password"
        ]

        # -----------------------------------
        # STEP 2 — Find user
        # -----------------------------------
        user = UserProfile.objects.filter(
            username=username
        ).first()

        # -----------------------------------
        # STEP 3 — Check account lockout
        # -----------------------------------
        if user and user.locked_until:

            # If lockout time still active
            if timezone.now() < user.locked_until:

                return Response(

                    {
                        "success": False,

                        "message":
                            "Account temporarily locked."
                    },

                    status=status.HTTP_403_FORBIDDEN
                )

        # -----------------------------------
        # STEP 4 — Authenticate user
        # -----------------------------------
        authenticated_user = authenticate(

            username=username,

            password=password
        )

        # -----------------------------------
        # STEP 5 — Invalid credentials
        # -----------------------------------
        if not authenticated_user:

            # Track failed attempts if user exists
            if user:

                user.failed_login_attempts += 1

                # Lock account after 5 failures
                if user.failed_login_attempts >= 5:

                    user.locked_until = (
                        timezone.now()
                        + timedelta(minutes=15)
                    )

                    # Audit lockout event
                    AuditLog.objects.create(

                        user=user,

                        event="account_locked",

                        details={
                            "reason":
                                "Too many failed logins"
                        },

                        ip_address=request.META.get(
                            "REMOTE_ADDR"
                        ),

                        user_agent=request.META.get(
                            "HTTP_USER_AGENT",
                            ""
                        ),
                    )

                user.save()

            # Audit failed login
            AuditLog.objects.create(

                user=user,

                event="login_failed",

                details={
                    "attempted_username":
                        username
                },

                ip_address=request.META.get(
                    "REMOTE_ADDR"
                ),

                user_agent=request.META.get(
                    "HTTP_USER_AGENT",
                    ""
                ),
            )

            return Response(

                {
                    "success": False,

                    "message":
                        "Invalid username or password."
                },

                status=status.HTTP_401_UNAUTHORIZED
            )

        # -----------------------------------
        # STEP 6 — Reset failed attempts
        # -----------------------------------
        authenticated_user.failed_login_attempts = 0

        authenticated_user.locked_until = None

        authenticated_user.save()

        # -----------------------------------
        # STEP 7 — Generate JWT tokens
        # -----------------------------------
        refresh = RefreshToken.for_user(
            authenticated_user
        )

        tokens = {

            "refresh": str(refresh),

            "access": str(
                refresh.access_token
            ),
        }

        # -----------------------------------
        # STEP 8 — Audit successful login
        # -----------------------------------
        AuditLog.objects.create(

            user=authenticated_user,

            event="login_success",

            details={
                "username":
                    authenticated_user.username
            },

            ip_address=request.META.get(
                "REMOTE_ADDR"
            ),

            user_agent=request.META.get(
                "HTTP_USER_AGENT",
                ""
            ),
        )

        # -----------------------------------
        # STEP 9 — Return response
        # -----------------------------------
        return Response({

            "success": True,

            "tokens": tokens,

            "user": {

                "id":
                    authenticated_user.id,

                "username":
                    authenticated_user.username,

                "email":
                    authenticated_user.email,

                "role":
                    authenticated_user.role,
            }

        })
    
class LogoutView(APIView):

    permission_classes = [
        IsAuthenticated
    ]


    def post(self, request):

        try:

            refresh_token = request.data.get(
                "refresh"
            )

            token = RefreshToken(
                refresh_token
            )

            # BLACKLIST TOKEN
            token.blacklist()

            return Response({

                "success": True,

                "message":
                    "Logged out successfully."

            })

        except Exception as e:

            return Response({

                "success": False,

                "message":
                    "Invalid token.",

                "error": str(e)

            },

            status=status.HTTP_400_BAD_REQUEST
            )

class MeView(APIView):

    permission_classes = [IsAuthenticated]


    def get(self, request):

        user = request.user

        return Response({

            "id": user.id,

            "username": user.username,

            "email": user.email,

            "role": user.role,
        })
    

class AuditLogListView(
    generics.ListAPIView
):

    queryset = AuditLog.objects.all(

        ).order_by("-created_at")

    serializer_class = AuditLogSerializer

    permission_classes = [
        IsAdminUser
    ]