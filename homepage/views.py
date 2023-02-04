from django.contrib.auth.models import User
from listings.models import Listing
from users.models import AppUser
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework import permissions, mixins, generics
from django.contrib import auth
from rest_framework.response import Response
from listings.serializers import ListingSerializer
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator

@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class DisplayListings(generics.GenericAPIView, mixins.ListModelMixin):
    permission_classes = (permissions.AllowAny,)
    queryset = Listing.objects.filter(pk__range = [1,20])
    lookup_field = 'pk'
    serializer_class = ListingSerializer  
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
        
