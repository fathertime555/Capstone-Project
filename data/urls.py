from django.urls import path
from . import views

app_name = "data"
urlpatterns = [
    path('', views.ListBoth.as_view()),
    path('items/', views.ListItems.as_view()),
    path('listings/', views.ListListings.as_view()),
    path('sort/listings/nearest/', views.SortListingsByLocation.as_view()),
    path('sort/listings/date/', views.SortListingsByDate.as_view()),
    path('sort/listings/theme/', views.SortListingsByTheme.as_view()),
    path('sort/items/nearest/', views.SortItemsByLocation.as_view()),
    path('sort/items/date/', views.SortItemsByDate.as_view()),
    path('sort/items/tags/', views.SortItemsByTag.as_view()),
	path('sort/items/listing/<int:pk>/', views.SortItemsByListing.as_view())
]