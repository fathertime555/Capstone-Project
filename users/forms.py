from django import forms
from django.contrib.auth import  login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

input_attribute = {"class":"textinput border rounded-lg leading-normal focus:outline-none text-gray-700 px-4 appearance-none bg-white block w-full border-gray-300 py-2"}


class Register_Form(UserCreationForm):
	username = forms.CharField(widget = forms.TextInput(attrs= input_attribute))
	email = forms.EmailField(widget = forms.EmailInput(attrs = input_attribute))
	password1 = forms.CharField(widget = forms.PasswordInput(attrs = input_attribute))
	password2 = forms.CharField(widget = forms.PasswordInput(attrs = input_attribute))

	class Meta:
		model = User

		fields = ["username", "email", "password1", "password2"]