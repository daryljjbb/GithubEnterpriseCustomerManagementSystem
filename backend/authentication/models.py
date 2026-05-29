from django.contrib.auth.models import AbstractUser
from django.db import models

from django.conf import settings


class UserProfile(AbstractUser):

    ROLE_CHOICES = (
        ("admin", "Admin"),
        ("agent", "Agent"),
        ("customer", "Customer"),
    )

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default="customer"
    )

    # ✅ ADD THESE (THIS FIXES YOUR ERROR)

    failed_login_attempts = models.IntegerField(
        default=0
    )

    locked_until = models.DateTimeField(
        null=True,
        blank=True
    )

class AuditLog(models.Model):

    EVENT_CHOICES = (

        # -----------------------------------
        # AUTHENTICATION EVENTS
        # -----------------------------------
        ("login_success", "Login Success"),

        ("login_failed", "Login Failed"),

        ("logout", "Logout"),

        ("token_refresh", "Token Refresh"),

        ("account_locked", "Account Locked"),

        ("unauthorized_access", "Unauthorized Access"),


        # -----------------------------------
        # CUSTOMER EVENTS
        # -----------------------------------
        ("customer_created", "Customer Created"),

        ("customer_updated", "Customer Updated"),

        ("customer_deleted", "Customer Deleted"),


        # -----------------------------------
        # SESSION EVENTS
        # -----------------------------------
        ("session_expired", "Session Expired"),

        ("idle_timeout", "Idle Timeout"),


        # -----------------------------------
        # SYSTEM EVENTS
        # -----------------------------------
        ("system_error", "System Error"),
    )

    user = models.ForeignKey(

        settings.AUTH_USER_MODEL,

        on_delete=models.SET_NULL,

        null=True,

        blank=True,
    )

    event = models.CharField(
        max_length=100,
        choices=EVENT_CHOICES
    )

    ip_address = models.GenericIPAddressField(
        null=True,
        blank=True
    )

    user_agent = models.TextField(
        blank=True
    )

    details = models.JSONField(
        default=dict,
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )


    class Meta:

        ordering = ["-created_at"]


    def __str__(self):

        return f"{self.event} - {self.created_at}"
    
class UserSession(models.Model):

    user = models.ForeignKey(
        UserProfile,
        on_delete=models.CASCADE
    )

    ip_address = models.GenericIPAddressField()

    user_agent = models.TextField()

    last_activity = models.DateTimeField(
        auto_now=True
    )

    is_active = models.BooleanField(
        default=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )