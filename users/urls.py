from django.urls import path
from . import views
from users import views

app_name = 'users'
urlpatterns = [

	path('listall/', views.UserList.as_view()),
	path('edit/<int:pk>/', views.UserDetail.as_view()),
	path("test/", views.TestView.as_view()),
	# path('users/register/', views.UserList.as_view()),

	#path('', views.AppUserView, name = "users"),
	# path('profile/', views.ProfileView.as_view(), name='profile'),
	# path('register/', views.RegisterProfileView.as_view(), name='register')
]