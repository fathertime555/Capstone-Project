from django.contrib import admin

# Register your models here.
from django.contrib.auth.admin import UserAdmin
from .models import AppUser
from listings.models import Listing, Item

admin.site.register(AppUser, UserAdmin)
admin.site.register(Listing)
admin.site.register(Item)
