from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

# since we want to only add to the User class we use AbstractUser
class AppUser (AbstractUser):

	# This will add these feilds to the database under the User I called in AppUser
	profile_picture = models.FileField(upload_to = "uploads/users/")
	address = models.TextField()
	phone_number = models.TextField()




