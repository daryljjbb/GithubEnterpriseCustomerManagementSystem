from django.utils import timezone

from datetime import timedelta


MAX_FAILED_ATTEMPTS = 5

LOCKOUT_MINUTES = 15


def handle_failed_login(user):

    user.failed_login_attempts += 1

    if (
        user.failed_login_attempts
        >= MAX_FAILED_ATTEMPTS
    ):

        user.locked_until = (
            timezone.now()
            + timedelta(
                minutes=LOCKOUT_MINUTES
            )
        )

    user.save()