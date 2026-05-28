from authentication.models import AuditLog


def get_client_ip(request):

    x_forwarded_for = request.META.get(
        "HTTP_X_FORWARDED_FOR"
    )

    if x_forwarded_for:

        return x_forwarded_for.split(",")[0]

    return request.META.get("REMOTE_ADDR")


def create_audit_log(
    *,
    event,
    request,
    user=None,
    details=None
):

    AuditLog.objects.create(

        user=user,

        event=event,

        ip_address=get_client_ip(request),

        user_agent=request.META.get(
            "HTTP_USER_AGENT",
            ""
        ),

        details=details or {},
    )