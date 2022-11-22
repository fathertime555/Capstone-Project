from django.urls import path
from listings.views import ListingCreationView
from . import views


urlpatterns = [
	path("listingbuilder/", views.ListingCreationView.as_view(), name="listingCreation"),
	path("view_all" , views.ListingUserViewAll.as_view,)
	path("test/", views.TestListing.as_view)

]