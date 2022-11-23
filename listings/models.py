from django.db import models
from django.contrib.auth.models import User
from users.models import AppUser


class Listing(models.Model):
	title = models.CharField(max_length = 50)
	listing_main_photo = models.FileField(null = True, blank = True, upload_to = "uploads/listings/")
	description = models.TextField()
	location = models.CharField(max_length = 150)
	owner = models.ForeignKey(
		AppUser, on_delete = models.CASCADE,
	)