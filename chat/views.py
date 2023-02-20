# from django.contrib.auth.models import User
# from .models import AppUser
# from django.shortcuts import get_object_or_404
# from rest_framework.views import APIView
# from rest_framework import permissions, viewsets, mixins,generics
# from django.contrib import auth
# from rest_framework.response import Response
# from .serializers import MainUserSerializer, UserRegistrationSerializer
# from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
# from django.utils.decorators import method_decorator
#
#
# class CheckAuthenticatedView(APIView):
#     def get(self, request, format=None):
#         user = self.request.user
#         try:
#             isAuthenticated = user.is_authenticated
#
#             if isAuthenticated:
#                 return Response({ 'isAuthenticated': 'success' })
#             else:
#                 return Response({ 'isAuthenticated': 'error' })
#         except:
#             return Response({ 'error': 'Something went wrong when checking authentication status' })