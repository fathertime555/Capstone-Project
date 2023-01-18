from django.db import models
from django.contrib.auth.models import AbstractUser


class AppUser (AbstractUser):

	# This will add these feilds to the database under the User I called in AppUser
	profile_picture = models.FileField(upload_to = "uploads/users/")
	address = models.TextField()
	phone_number = models.TextField()

# @receiver(post_save, sender = settings.AUTH_USER_MODEL)
	# def create_auth_token (self, sender, instance=None, created=False, **kwargs):
	# 	if created:
	# 		Token.objects.create(user = instance)




