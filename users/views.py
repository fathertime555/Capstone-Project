from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.views import View
from .forms import RegisterForm, ProfileForm


class ProfileView(LoginRequiredMixin,View):
	# if we get a get request i.e visted the page.
	def get(self, request, *args, **kwargs):

		form = ProfileForm(instance = request.user)
		return render(request, "users/profile.html", {"form": form})
	# if the form is submitted
	def post(self,request, *args, **kwargs):
		form = ProfileForm(request.POST, request.FILES, instance = request.user)
		if form.is_valid():
			form.save()
			return redirect("users/profile.html")
		else:
			return render(request, "users/profile.html", {"form": form})

class RegisterProfileView(View):
	def get(self,request, *args, **kwargs):
		form = RegisterForm()
		return render(request, "users/register.html",{"form":form})
	def post(self,request, *args, **kwargs):
		form = RegisterForm(request.POST)
		if form.is_valid():
			form.save()
			return redirect("login")
		else:
			return render(request, "users/register.html",{"form":form})
class WelcomePage(View):

	def get(self,request, *args, **kwargs):
		return render(request, "users/welcome.html")
	def post(self,request, *args, **kwargs):
		return render(request, "users/welcome.html")


