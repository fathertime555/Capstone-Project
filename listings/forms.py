from django import forms
from django.forms import ModelForm
from listings.models import Listing


class ListingCreationForm(ModelForm):

	class Meta:
		model = Listing
		fields = ["title", "listing_main_photo", "description", "location"]
