from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.dispatch import receiver


# Create your models here.
class AppUser (AbstractUser):

	profile_picture = models.FileField(upload_to = "uploads/")
	address = models.TextField()
	phone_number = models.TextField()


