from django.db import models
from django.contrib.auth.models import AbstractUser

def upload_to(instance, filename):
	return 'images/{filename}'.format(filename=filename)

# since we want to only add to the User class we use AbstractUser
class AppUser (AbstractUser):

	# This will add these feilds to the database under the User I called in AppUser
	profile_picture = models.FileField(upload_to = "uploads/users/")
	address_line_1 = models.CharField(max_length = 200, default = "None")
	address_line_2 = models.CharField(max_length = 200,default = "None")
	city = models.CharField(max_length = 30,default = "None")
	state = models.CharField(max_length = 2,default = "None")
	zip_code = models.CharField(max_length = 16,default = "None")
	phone_number = models.CharField(max_length = 16,default = "None")
	image_url = models.ImageField(upload_to = upload_to, blank = True, null = True)




