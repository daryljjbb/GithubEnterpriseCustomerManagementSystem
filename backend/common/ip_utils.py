# common/ip_utils.py

def get_client_ip(request):

    """
    Enterprise helper utility
    for extracting the real client IP.
    """

    x_forwarded_for = request.META.get(
        "HTTP_X_FORWARDED_FOR"
    )

    if x_forwarded_for:

        ip = x_forwarded_for.split(",")[0]

    else:

        ip = request.META.get("REMOTE_ADDR")

    return ip