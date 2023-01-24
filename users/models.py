from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.dispatch import receiver
from SpiffoList import settings
from rest_framework.authtoken.models import Token


class AppUser (AbstractUser):

	# This will add these feilds to the database under the User I called in AppUser
	profile_picture = models.FileField(upload_to = "uploads/users/")
	address = models.TextField()
	phone_number = models.TextField()

	def __str__(self):
		return self.username

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
	if created:
		Token.objects.create(user=instance)




