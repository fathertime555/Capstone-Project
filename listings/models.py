from django.db import models
from django.contrib.auth.models import User
from users.models import AppUser
import datetime


class Listing(models.Model):
	title = models.CharField(max_length = 50)
	listing_main_photo = models.FileField(null = True, blank = True, upload_to = "uploads/listings/")
	description = models.TextField()
	location = models.CharField(max_length = 150)
	lat = models.CharField(max_length = 20, default="0")
	lng = models.CharField(max_length = 20, default="0")
	owner = models.IntegerField()
	theme = models.TextField(null=True)
	zip_code = models.CharField(max_length = 20, default = "000000")
	date = models.DateTimeField(default=datetime.date.today)

class Item(models.Model):
	name = models.CharField(max_length = 50)
	item_main_photo = models.FileField(null = True, blank = True, upload_to = "uploads/items/")
	description = models.TextField()
	quantity = models.IntegerField()
	price = models.FloatField()
	owner = models.IntegerField()
	listing = models.IntegerField()
	tags = models.TextField(null=True)
	zip_code = models.CharField(max_length = 20, default = "000000")
	lat = models.CharField(max_length = 20, default="0")
	lng = models.CharField(max_length = 20, default="0")
	date = models.DateTimeField(default=datetime.date.today)

