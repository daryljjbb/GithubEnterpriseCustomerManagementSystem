from django.urls import path
from .views import LoginView, MeView, LogoutView
from rest_framework_simplejwt.views import (
    TokenRefreshView
)
from rest_framework_simplejwt.views import (
    TokenBlacklistView,
)


urlpatterns = [
    path("login/", LoginView.as_view()),
    path("me/", MeView.as_view()),

    # Refresh access token
    path(
        "token/refresh/",
        TokenRefreshView.as_view()
    ),
     path(
        "logout/",
        LogoutView.as_view(),
    ),
]