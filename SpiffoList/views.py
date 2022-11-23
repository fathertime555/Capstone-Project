from django.shortcuts import render
from django.views import View


class WelcomePage(View):
	def get (self, request, *args, **kwargs):
		return render(request, 'users/welcome.html')

	def post (self, request, *args, **kwargs):
		return render(request, 'users/welcome.html')
