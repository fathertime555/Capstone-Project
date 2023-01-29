from django.urls import path
from .views import UserViewSet,LoginView, LogoutView, CheckAuthenticatedView
from rest_framework import routers
#
# router = routers.SimpleRouter()
# router.register(r"register/", UserViewSet)

app_name = "users"
urlpatterns = [
    path('authenticated/', CheckAuthenticatedView.as_view()),
    path('register/', UserViewSet.as_view({'post': 'create'})),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),

    #path('delete/', DeleteAccountView.as_view()),
    #path('csrf_cookie/', GetCSRFToken.as_view())

]