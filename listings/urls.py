from django.urls import path
from . import views

app_name = 'listings'
urlpatterns = [
	path('new', views.ListingCreationView.as_view(), name='create'),
	path('', views.ListingUserViewAll.as_view(), name='index'),
	path('<int:pk>/destroy', views.DestroyListing.as_view(), name='destroy')
]