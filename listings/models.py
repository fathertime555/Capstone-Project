from django.db import models
from django.contrib.auth.models import User
from users.models import AppUser
import datetime


def listing_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT / user_<id>/<filename>
    return 'static/listings/listing_{0}/{1}'.format(instance.pk, filename)
def item_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT / user_<id>/<filename>
    return 'static/items/item_{0}/{1}'.format(instance.pk, filename)

class Listing(models.Model):
	title = models.CharField(max_length = 50)
	listing_main_photo = models.ImageField(upload_to = listing_directory_path(), blank = True, null = True)
	listing_photo_url = models.FilePathField(null = True, blank = True)
	description = models.TextField(null = True, blank = True)
	location = models.CharField(max_length = 150)
	lat = models.CharField(max_length = 20, default="0")
	lng = models.CharField(max_length = 20, default="0")
	owner = models.IntegerField()
	theme = models.TextField(null=True, blank = True)
	zip_code = models.IntegerField()
	start_time = models.DateTimeField(default=datetime.date.today)
	end_time = models.DateTimeField(default=datetime.date.today)


class Item(models.Model):
	name = models.CharField(max_length = 150)
	item_photo_url = models.FilePathField(null = True, blank = True)
	item_photo = models.ImageField(upload_to = item_directory_path, blank = True, null = True)
	description = models.TextField(null = True, blank = True)
	quantity = models.IntegerField()
	price = models.FloatField()
	owner = models.IntegerField()
	listing = models.IntegerField()
	tags = models.TextField(null=True)
	zip_code = models.IntegerField()
	lat = models.CharField(max_length = 20, default="0")
	lng = models.CharField(max_length = 20, default="0")
	start_time = models.DateTimeField(default=datetime.date.today)
	end_time = models.DateTimeField(default=datetime.date.today)
