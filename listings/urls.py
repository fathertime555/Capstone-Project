from django.urls import path
from . import views

app_name = "listings"
urlpatterns = [
    path('create/', views.ListingCreation.as_view()),
	path('<int:pk>/', views.SpecificListing.as_view()),
	path('<int:pk>/delete/', views.ListingDelete.as_view()),
	path('<int:pk>/update/', views.ListingUpdate.as_view()),
	path('<int:pk>/createitem/', views.ItemCreation.as_view()),
	path('<int:listpk>/<int:itempk>/', views.SpecificItem.as_view()),
	path('<int:listpk>/<int:itempk>/delete/', views.ItemDelete.as_view()),
	path('<int:listpk>/<int:itempk>/update/', views.ItemUpdate.as_view()),
	path('owner/', views.ListListings.as_view()),
    path('sort/nearest/', views.SortListingsByLocation.as_view()),
    path('sort/date/', views.SortListingsByDate.as_view()),
    path('sort/theme/', views.SortListingsByTheme.as_view()),
    path('sort/items/location/', views.SortItemsByLocation.as_view()),
    path('sort/items/date/', views.SortItemsByDate.as_view()),
    path('sort/items/tags/', views.SortItemsByTag.as_view())	
]
