from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.views import View

from .forms import RegisterForm, ProfileForm
# Create your views here.


class ProfileView(LoginRequiredMixin,View):
	# if we get a get request i.e visted the page.
	def get (self, request, *args, **kwargs):

		form = ProfileForm(instance = request.user)
		return render(request, "users/profile.html", {"form": form})
	def post(self,request, *args, **kwargs):
		form = ProfileForm(request.POST, request.FILES, instance = request.user)
		if form.is_valid():
			form.save()
			return redirect("profile")
		else:
			return render(request, "users/profile.html", {"form": form})


def register(request):

	if request.method == "POST":
		# new user
		form = RegisterForm(request.POST)
		if form.is_valid():
			form.save()
			return redirect("/")
	else:
		form = RegisterForm()

	return render(request, "users/register.html", {"form": form})

def home(request):
	return HttpResponse("<h1> Home <h1> <a href=\"register/\">Register Here</a>")



