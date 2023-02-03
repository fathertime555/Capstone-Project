from django.urls import path
from .views import UserRegistration, LoginView, LogoutView, CheckAuthenticatedView

app_name = "users"
urlpatterns = [
    path('authenticated/', CheckAuthenticatedView.as_view()), # for testing
    path('register/', UserRegistration.as_view({'post': 'create'})),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),
]