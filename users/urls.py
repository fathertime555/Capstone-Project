from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from .views import UserRegistration, LoginView, LogoutView, CheckAuthenticatedView, UserSearch

app_name = "users"
urlpatterns = [
    path('authenticated/', CheckAuthenticatedView.as_view()), # for testing
    path('register/', UserRegistration.as_view({'post': 'create'})),
    path("search/", UserSearch.as_view({'get': 'list'})),
    path('search/<str:username>/', UserSearch.as_view({'get': 'retrieve'})),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) # so that images can be uploaded