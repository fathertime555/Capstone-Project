from django.conf import settings
from django.conf.urls.static import static
from django.urls import include, path
from django_rest_passwordreset.views import reset_password_request_token, reset_password_confirm

from .views import UserRegistration, LoginView, LogoutView, CheckAuthenticatedView, UserSearch

app_name = "users"
urlpatterns = [
    path('authenticated/', CheckAuthenticatedView.as_view()), # for testing
    path('register/', UserRegistration.as_view({'post': 'create'})),
    path("search/", UserSearch.as_view({'get': 'list'})),
    path('search/<str:username>/', UserSearch.as_view({'get': 'retrieve'})),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('password_reset/', reset_password_request_token, name='password_reset_api'),
    path('password_reset/confirm/', reset_password_confirm, name='password_reset_confirm_api'),
    path('root_password_resetapi/', include('django_rest_passwordreset.urls', namespace='password_reset')),
]