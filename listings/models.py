from django.db import models
from django.forms import ModelForm


# Create your models here.

class Listing(ModelForm):
	title = models.CharField(max_length = 50)
	listing_main_photo = models.FileField(upload_to = "uploads/listings/")
	description = models.TextField()
	location = models.CharField(max_length = 150)