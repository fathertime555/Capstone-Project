from django.db import models
from django.contrib.auth.models import User
from users.models import AppUser


class Listing(models.Model):
	title = models.CharField(max_length = 50)
	listing_main_photo = models.FileField(null = True, blank = True, upload_to = "uploads/listings/")
	description = models.TextField()
	location = models.CharField(max_length = 150)
	owner = models.CharField(max_length = 150)

class Item(models.Model):
	name = models.CharField(max_length = 50)
	item_main_photo = models.FileField(null = True, blank = True, upload_to = "uploads/items/")
	description = models.TextField()
	quantity = models.IntegerField()
	price = models.FloatField()
	owner = models.CharField(max_length = 150)
	listing = models.IntegerField()
