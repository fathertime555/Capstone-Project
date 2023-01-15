from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render, redirect
from django.views import View
from django.views.decorators.csrf import csrf_exempt

from .forms import RegisterForm, ProfileForm
from django.shortcuts import render
from .serializers import UserSerializer
from .models import AppUser
from rest_framework import mixins
from rest_framework import generics


class UserList(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    queryset = AppUser.objects.all()
    serializer_class = UserSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class UserDetail(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, generics.GenericAPIView):
    queryset = AppUser.objects.all()
    serializer_class = UserSerializer
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

#
# class ProfileView(LoginRequiredMixin, View):
# 	def get(self, request, *args, **kwargs):
# 		""""if we get a get request i.e visted the page."""
# 		form = ProfileForm(instance = request.user)
# 		return render(request, 'users/profile.html', {'form': form})
#
# 	def post(self, request, *args, **kwargs):
# 		""""if the form is submitted"""
# 		form = ProfileForm(request.POST, request.FILES, instance = request.user)
# 		if form.is_valid():
# 			form.save()
# 			return redirect('users:profile')
# 		else:
# 			return render(request, 'users/profile.html', {'form': form})
#
#
# class RegisterProfileView(View):
# 	def get(self, request, *args, **kwargs):
# 		form = RegisterForm()
# 		return render(request, 'users/register.html', {'form': form})
#
# 	def post(self, request, *args, **kwargs):
# 		form = RegisterForm(request.POST)
# 		if form.is_valid():
# 			form.save()
# 			return redirect('users:profile')
# 		else:
# 			return render(request, "users/register.html", {"form": form})
