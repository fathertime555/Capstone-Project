from django.shortcuts import render, redirect
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views import View
from .forms import ListingCreationForm
from django.http import HttpResponse

# This is where the listing creation is
class ListingCreationView(LoginRequiredMixin,View):

	# when the page is requested
	def get (self, request, *args, **kwargs):
		form = ListingCreationForm(instance = request.user)
		return (render(request, "listings/listingCreation.html", {"form":form}))

	# when the listing creation form is submitted we need to verify it.
	def post (self, request, *args, **kwargs):
		form = ListingCreationForm(request.POST, request.FILES, instance = request.user)
		if form.is_valid():
			form.save()
			# for now if the form saves we will redirect them to "home"
			return redirect("users/welcome.html")
		else:
			return render(request, "listings/listingCreation.html", {"form": form})

class TestListing(LoginRequiredMixin,View):

	def get (self, request, *args, **kwargs):
		return HttpResponse("<h1>Testing The Listing Page</h1>")
	def post (self, request, *args, **kwargs):
		return HttpResponse("<h1>Testing The Listing Page</h1>")