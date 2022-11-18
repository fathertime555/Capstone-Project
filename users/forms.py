from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.forms import ModelForm

from users.models import AppUser

input_attribute = {"class":"textinput border rounded-lg leading-normal focus:outline-none text-gray-700 px-4 appearance-none bg-white block w-full border-gray-300 py-2"}


class RegisterForm(UserCreationForm):

	username = forms.CharField(widget = forms.TextInput(attrs= input_attribute))
	email = forms.EmailField(widget = forms.EmailInput(attrs = input_attribute))
	password1 = forms.CharField(widget = forms.PasswordInput(attrs = input_attribute))
	password2 = forms.CharField(widget = forms.PasswordInput(attrs = input_attribute))

	class Meta:
		model = User

		fields = ["username", "email", "password1", "password2"]

class ProfileForm(ModelForm):



	class Meta:
		model = AppUser

		fields = ["profile_picture", "email", "phone_number", "address"]