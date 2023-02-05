from django.contrib.auth.models import User
from listings.models import Listing, Item
from users.models import AppUser
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework import permissions, mixins, generics
from django.contrib import auth
from rest_framework.response import Response
from listings.serializers import ListingSerializer, ItemSerializer
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator

@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class Homepage(generics.GenericAPIView, mixins.ListModelMixin):
    permission_classes = (permissions.AllowAny,)
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer 
    def get (self, request, *args, **kwargs):    
        queryset_a = Listing.objects.filter(pk__range = [1,20])
        queryset_b = Item.objects.filter(pk__range =[1,20])

        # Create an iterator for the querysets and turn it into a list.
        results_list = list(queryset_b)
        for i in queryset_a:
            results_list.append(i)

        # Build the list with items based on the FeedItemSerializer fields
        results = list()
        for entry in results_list:
            item_type = entry.__class__.__name__.lower()
            if isinstance(entry, Listing):
                serializer = ListingSerializer(entry)
            if isinstance(entry, Item):
                serializer = ItemSerializer(entry)
            results.append(serializer.data)

        return Response(results)