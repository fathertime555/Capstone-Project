from django.urls import path
from . import views

app_name = 'users'
urlpatterns = [
	path('profile/', views.ProfileView.as_view(), name='profile'),
	path('register/', views.RegisterProfileView.as_view(), name='register')
]