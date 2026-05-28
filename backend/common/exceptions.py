import logging

logger = logging.getLogger(__name__)


def log_failed_login(username, error):

    logger.error(
        f"Failed login attempt for user: {username} | Error: {error}"
    )