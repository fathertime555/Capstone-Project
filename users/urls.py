from django.urls import path
from . import views
from users import views

app_name = 'users'
urlpatterns = [
	#path('', views.AppUserView, name = "users"),
	# path('profile/', views.ProfileView.as_view(), name='profile'),
	# path('register/', views.RegisterProfileView.as_view(), name='register')
]