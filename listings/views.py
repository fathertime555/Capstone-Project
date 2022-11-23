from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views import View
from .forms import ListingCreationForm
from django.http import HttpResponse
from .models import Listing


class ListingCreationView(LoginRequiredMixin, View):
	"""This is where the listing creation is"""

	def get(self, request, *args, **kwargs):
		"""when the page is requested"""
		if request.user.is_authenticated:
			form = ListingCreationForm()
			return render(request, 'listings/listingCreation.html', {'form': form})
		else:
			return redirect('users:login')

	def post(self, request, *args, **kwargs):
		"""when the listing creation form is submitted we need to verify it."""
		if request.user.is_authenticated:
			listing = Listing(owner = request.user)  # init a new listings instance
			form = ListingCreationForm(request.POST, request.FILES, instance = listing)
			if form.is_valid():
				form.save()
				return render(request, 'users/welcome.html', {'form': form})
			else:
				return render(request, 'users/welcome.html', {'form': form})
		else:
			return redirect('users:login')


class ListingUserViewAll(LoginRequiredMixin, View):
	def get(self, request, *args, **kwargs):
		if request.user.is_authenticated:
			all_listings = Listing.objects.filter(owner = request.user.id)

			return render(request, 'listings/index.html', {'all_listings': all_listings})
		else:
			return redirect('users:login')

	def post(self, request, *args, **kwargs):
		return HttpResponse('<h1>Testing The Listing Page</h1>')


class DestroyListing(LoginRequiredMixin, View):
	def post(self, request, pk: int, *args, **kwargs):
		if request.user.is_authenticated:
			listing = get_object_or_404(Listing, pk = pk, owner = request.user)
			listing.delete()
			return redirect('listings:index')
