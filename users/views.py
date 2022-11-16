from django.shortcuts import render, redirect
from django.http import HttpResponse
from .forms import Register_Form
# Create your views here.

def register(request):

	if request.method == "POST":
		# new user
		form = Register_Form(request.POST)
		if form.is_valid():
			form.save()
			return redirect("/")
	else:
		form = Register_Form()

	return render(request, "users/register.html", {"form": form})

def home(request):
	return HttpResponse("<h1> Home <h1> <a href=\"register/\">Register Here</a>")
