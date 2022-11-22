from django.urls import path
from . import views


urlpatterns = [
	path("listingbuilder/", views.ListingCreationForm.as_view, name="listingCreation"),
	path("test/", views.TestListing)

]