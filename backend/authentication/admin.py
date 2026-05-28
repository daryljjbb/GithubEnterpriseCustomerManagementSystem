from django.contrib import admin

from .models import AuditLog, UserProfile

admin.site.register(UserProfile)
@admin.register(AuditLog)
class AuditLogAdmin(admin.ModelAdmin):

    list_display = (
        "event",
        "user",
        "ip_address",
        "created_at",
    )

    search_fields = (
        "event",
        "user__username",
    )

    list_filter = (
        "event",
        "created_at",
    )