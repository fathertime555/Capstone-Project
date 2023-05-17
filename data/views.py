from django.contrib.auth.models import User
from listings.models import Listing, Item
from users.models import AppUser
from users.serializers import MainUserSerializer
from rest_framework import permissions, mixins, generics
from django.contrib import auth
from rest_framework.response import Response
from listings.serializers import ListingSerializerPost, ItemSerializerPost
from rest_framework.parsers import MultiPartParser, FormParser
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator
import requests
from django.conf import settings
from SpiffoList.axios import Axios_response

@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class ListItems(generics.GenericAPIView, mixins.ListModelMixin):
    permission_classes = (permissions.AllowAny,)
    queryset = Item.objects.all()
    lookup_field = 'pk'
    serializer_class = ItemSerializerPost  
    def get(self, request, *args, **kwargs):
        return Axios_response.ResponseSuccess(data = self.list(request, *args, **kwargs).data, dataname = "Items",message='All Items')

@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class ListListings(generics.GenericAPIView, mixins.ListModelMixin):
    permission_classes = (permissions.AllowAny,)
    queryset = Listing.objects.all()
    lookup_field = 'pk'
    serializer_class = ListingSerializerPost  

    def get(self, request, *args, **kwargs):
        return Axios_response.ResponseSuccess(data = self.list(request, *args, **kwargs).data, dataname = "Listings",message='All Listings')
        
@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class ListBoth(generics.GenericAPIView, mixins.ListModelMixin):
    permission_classes = (permissions.AllowAny,)
    queryset = Listing.objects.all()
    serializer_class = ListingSerializerPost 

    def get (self, request, *args, **kwargs):   
        queryset_a = Listing.objects.all()
        queryset_b = Item.objects.all()

        # Create an iterator for the querysets and turn it into a list.
        results_list = list(queryset_b)
        for i in queryset_a:
            results_list.append(i)

        # Build the list with items based on the FeedItemSerializer fields
        Listing_results = list()
        items_results = list()
        for entry in results_list:
            item_type = entry.__class__.__name__.lower()
            if isinstance(entry, Listing):
                Listing_results.append(ListingSerializerPost(entry).data)
            if isinstance(entry, Item):
                items_results.append(ItemSerializerPost(entry).data)
            # results.append(serializer.data)

        user = self.request.user
        userinfo = {}
        if user.is_authenticated:
            userinfo = MainUserSerializer(AppUser.objects.get(pk=user.pk)).data

        data = {'listings': Listing_results,
            'items': items_results,
            'islogin': user.is_authenticated,
            'user': userinfo}
        
        return Axios_response.ResponseSuccess(data = data, dataname = "Both",message='All Items and Listings')

@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class SortListings(generics.GenericAPIView, mixins.ListModelMixin):
    permission_classes = (permissions.AllowAny,)
    queryset = Listing.objects.all()
    lookup_field = 'zip_code'
    serializer_class = ListingSerializerPost

    def get(self, request, *args, **kwargs):
        results = list()
        if (request.query_params["Theme"] != ""):
            queryset_a = Listing.objects.filter(theme__icontains=request.query_params["Theme"])
            results_list = list(queryset_a)
            for entry in results_list:
                results.append(ListingSerializerPost(entry).data)

        if (request.query_params["Location"] != ""):
            userLat = request.query_params["Location"]["Lat"]
            userLong = request.query_params["Location"]["Lng"]
            origin = f'{userLat}, {userLong}'
            toSearch = list()
            if not results:
                queryset_a = Listing.objects.filter(zip_code=request.query_params["Location"]["Zip Code"])
                toSearch = list(queryset_a)
            else:
                toSearch = results
            destination = list()
            for entry in toSearch:
                destLat = entry.lat
                destLong = entry.lng
                destination.append(f'{destLat}, {destLong}')
            result = requests.get('https://maps.googleapis.com/maps/api/distancematrix/json?', params={
                              'origin': origin, 'destination': destination, 'key': settings.GOOGLE_API_KEY})
            destinations = result.json()
            sortedDestinations = {}
            index = 0
            for s in destinations["rows"][0]["elements"]:
                sortedDestinations[destinations["destination_addresses"][index]] = s["distance"]["value"]
                index = index + 1
            sortedDestinations = sorted(sortedDestinations.items(), key=lambda item: item[1])
            results.clear()
            for key in sortedDestinations:
                x = key.split(", ")
                results.append(ListingSerializerPost(Listing.objects.get(lat=x[0], lng=x[1])).data)
        
        if (request.query_params["Date"] != ""):
            results_list = list()
            if not results:
                results_list = list(Listing.objects.order_by("end_time"))
            else: 
                results_list = sorted(results, key=lambda obj: getattr(obj, "end_time"))
            results.clear()
            for entry in results_list:
                results.append(ListingSerializerPost(entry).data)

        return Axios_response.ResponseSuccess(data = results, dataname = "Listings",message='Sorted Listings')

@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class SortItems(generics.GenericAPIView, mixins.ListModelMixin):
    permission_classes = (permissions.AllowAny,)
    queryset = Item.objects.all()
    lookup_field = 'zip_code'
    serializer_class = ItemSerializerPost

    def get(self, request, *args, **kwargs):
        results = list()

        if(request.query_params["Tag"] != ""):
            queryset = Item.objects.filter(tags__icontains=request.query_params["Tag"])
            results_list = list(queryset)
            for entry in results_list:
                results.append(ItemSerializerPost(entry).data)

        if(request.query_params["Listing"] != ""):
            queryset = list()
            if not results:
                queryset = Item.objects.filter(listing=request.query_params["Listing"])
            else:
                for entry in results:
                    if entry.listing == request.query_params["Listing"]:
                        queryset.append(entry)
            results_list = list(queryset)
            results.clear()
            for entry in results_list:
                results.append(ItemSerializerPost(entry).data)

        if (request.query_params["Location"] != ""):
            userLat = request.query_params["Location"]["Lat"]
            userLong = request.query_params["Location"]["Lng"]
            origin = f'{userLat}, {userLong}'
            toSearch = list()
            if not results:
                queryset_a = Item.objects.filter(zip_code=request.query_params["Location"]["Zip Code"])
                toSearch = list(queryset_a)
            else:
                toSearch = results
            destination = list()
            for entry in toSearch:
                destLat = entry.lat
                destLong = entry.lng
                destination.append(f'{destLat}, {destLong}')
            result = requests.get('https://maps.googleapis.com/maps/api/distancematrix/json?', params={
                              'origin': origin, 'destination': destination, 'key': settings.GOOGLE_API_KEY})
            destinations = result.json()
            sortedDestinations = {}
            index = 0
            for s in destinations["rows"][0]["elements"][0]:
                sortedDestinations[destinations["destination_addresses"][index]] = s["distance"]["value"]
                index = index + 1
            sortedDestinations = sorted(sortedDestinations.items(), key=lambda item: item[1])
            results.clear()
            for key in sortedDestinations:
                x = key.split(", ")
                results.append(ItemSerializerPost(Item.objects.get(lat=x[0], lng=x[1])).data)

        if (request.query_params["Date"] != ""):
            results_list = list()
            if not results:
                results_list = list(Item.objects.order_by("end_time"))
            else: 
                results_list = sorted(results, key=lambda obj: getattr(obj, "end_time"))
            results.clear()
            for entry in results_list:
                results.append(ItemSerializerPost(entry).data)
        
        return Axios_response.ResponseSuccess(data = results, dataname = "Items",message='Sorted Items')
