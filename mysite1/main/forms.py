from django import forms
from django.forms import ModelForm
from .models import Listing, Event

class CreateNewList(forms.Form):
	name = forms.CharField(label="Name", max_length=200)
	check = forms.BooleanField(required=False)

class CreateNewListing(forms.Form):
	lsname = forms.CharField(label="Listing Name", max_length=100)
	address = forms.CharField(label="Address", max_length=50)
	phoneno = forms.CharField(label="Phone", max_length=12)
	description = forms.CharField(label="Listing Description", max_length=500)

class ListingForm(ModelForm):
	class Meta:
		model = Listing
		fields = '__all__'

class EventForm(ModelForm):
	class Meta:
		model = Event
		fields = ('name', 'event_date', 'venue', 'description')
		labels = {
					'name': 'Sale Name',
					'event_date': 'Sale Date',
					'venue': 'Location',
					'description': 'Description',
		}
		widgets = {
				'name': forms.TextInput(attrs={'class':'form-control', 'placeholder':'Event Name'}),
				'event_date': forms.TextInput(attrs={'class':'form-control', 'placeholder':'YYYY-MM-DD HH:MM:SS'}),
				'venue': forms.TextInput(attrs={'class':'form-select', 'placeholder':'Venue'}),
				'description': forms.Textarea(attrs={'class':'form-control', 'placeholder':'Description'}),
		}