from django.contrib import admin
from .models import ToDoList, Item, Listing, Event
# Register your models here.
admin.site.register(ToDoList)
admin.site.register(Item)
admin.site.register(Listing)
admin.site.register(Event)

# from django import forms
#from django.contrib.auth.forms import UserCreationForm
#from django.contrib.auth.models import User
#from django.forms import ModelForm
#from users.models import AppUser