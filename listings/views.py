from django.shortcuts import render, redirect
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views import View
from django.views.generic import TemplateView
from .forms import ListingCreationForm
from django.http import HttpResponse

from .models import Listing


# This is where the listing creation is
class ListingCreationView(LoginRequiredMixin, View):

	# when the page is requested
	def get (self, request, *args, **kwargs):
		if request.user.is_authenticated:
			form = ListingCreationForm()
			return render(request, "listings/listingCreation.html", {"form":form})
		else:
			return redirect("accounts/login/")


	# when the listing creation form is submitted we need to verify it.
	def post (self, request, *args, **kwargs):
		if request.user.is_authenticated:

			listing = Listing(owner = request.user) # init a new listings instance
			form = ListingCreationForm(request.POST, request.FILES, instance = listing)

			if form.is_valid():
				form.save()
				return render(request, "users/profile.html", {"form":form})

			else:
				return render(request, "listings/listingCreation.html", {"form": form})
		else:
			return redirect("accounts/login/")

class ListingUserViewAll(LoginRequiredMixin,View):


class TestListing(LoginRequiredMixin,View):

	def get (self, request, *args, **kwargs):
		return HttpResponse("<h1>Testing The Listing Page</h1>")
	def post (self, request, *args, **kwargs):
		return HttpResponse("<h1>Testing The Listing Page</h1>")