from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.forms import ModelForm
from users.models import AppUser

# input_attribute = {"class":"textinput border rounded-lg leading-normal focus:outline-none text-gray-700 px-4 appearance-none bg-white block w-full border-gray-300 py-2"}
# when using the meta tag you can use the input attribute to add css to the form as well.

class RegisterForm(UserCreationForm):
	class Meta:
		model = AppUser
		fields = ["username", "email", "password1", "password2"]

class ProfileForm(ModelForm):
	class Meta:
		model = AppUser
		fields = ["profile_picture", "email", "phone_number", "address"]