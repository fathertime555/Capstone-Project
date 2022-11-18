from django.urls import path
from . import views


urlpatterns = [
	path("profile/", views.ProfileView.as_view(), name="profile"),
	path("register/", views.RegisterProfileView.as_view(), name="register"),
	path("", views.WelcomePage.as_view(), name="welcome")

]