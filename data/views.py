from listings.models import Listing, Item
from users.models import AppUser
from users.serializers import MainUserSerializer
from rest_framework import permissions, mixins, generics
from listings.serializers import ListingSerializerPost, ItemSerializerPost
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator
import requests
from django.conf import settings
from PongosList.axios import Axios_response
import geocoder
import json

#API that, when called by the frontend, returns all of the available items in the database (would need to put in restrictions in a real production server to prevent long response times)
@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class ListItems(generics.GenericAPIView, mixins.ListModelMixin):
    permission_classes = (permissions.AllowAny,)
    queryset = Item.objects.all()
    lookup_field = 'pk'
    serializer_class = ItemSerializerPost  
    def get(self, request, *args, **kwargs):
        return Axios_response.ResponseSuccess(data = self.list(request, *args, **kwargs).data, dataname = "Items",message='All Items')

#API that, when called by the frontend, returns all of the available listings in the database (would need to put in restrictions in a real production server to prevent long response times)
@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class ListListings(generics.GenericAPIView, mixins.ListModelMixin):
    permission_classes = (permissions.AllowAny,)
    queryset = Listing.objects.all()
    lookup_field = 'pk'
    serializer_class = ListingSerializerPost  

    def get(self, request, *args, **kwargs):
        return Axios_response.ResponseSuccess(data = self.list(request, *args, **kwargs).data, dataname = "Listings",message='All Listings')
        
#API that, when called by the frontend, returns both all of the available listings and all of the available items in the database (would need to put in restrictions in a real production server to prevent long response times)
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

#API that, when called with certain parameters, will return the listings in the database sorted according to those parameters
@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class SortListings(generics.GenericAPIView, mixins.ListModelMixin):
    permission_classes = (permissions.AllowAny,)
    queryset = Listing.objects.all()
    lookup_field = 'zip_code'
    serializer_class = ListingSerializerPost

    def get(self, request, *args, **kwargs):
        results = list()

        #Filters listings of a certain theme
        if (request.query_params.get("Theme") != ""):
            queryset_a = Listing.objects.filter(theme__icontains=request.query_params.get("Theme"))
            results_list = list(queryset_a)
            for entry in results_list:
                results.append(ListingSerializerPost(entry).data)

        #Sorts sales by distance from current user location
        if (request.query_params.get("Location") != ""):
            g = geocoder.ip('me')
            toSearch = list()
            if not results:
                queryset_a = Listing.objects.all()
                toSearch = list(queryset_a)
            else:
                toSearch = results
            destinations = {}
            split_list = lambda lst, size: [lst[i:i+size] for i in range(0, len(lst), size)]
            sublists = split_list(toSearch, 25)
            for lists in sublists:
                url = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + str(g.latlng[0]) + "%2C" + str(g.latlng[1]) + "&destinations="
                for entry in lists:
                    url = url + entry.lat + "%2C" + entry.lng + "%7C"
                url = url[:-3] + "&key=" + settings.GOOGLE_API_KEY
                payload={}
                headers={}
                result = requests.request('GET', url, headers=headers, data=payload)
                toSave = json.loads(result.text)
                for i in range(len(lists)):
                    destinations[lists[i].pk] = (toSave["rows"][0]["elements"][i]["distance"]["value"])
                sortedDestinations = sorted(destinations.items(), key=lambda item: item[1])
                results.clear()
                for key in sortedDestinations:
                    results.append(ListingSerializerPost(Listing.objects.get(pk = key[0])).data)
        
        #Sorts by sale ending time
        if (request.query_params.get("Date") != ""):
            results_list = list()
            if not results:
                results_list = list(Listing.objects.order_by("end_time"))
            else: 
                results_list = sorted(results, key=lambda obj: getattr(obj, "end_time"))
            results.clear()
            for entry in results_list:
                results.append(ListingSerializerPost(entry).data)

        return Axios_response.ResponseSuccess(data = results, dataname = "Listings",message='Sorted Listings')

#API that, when called with certain parameters, will return the items in the database sorted according to those parameters
@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class SortItems(generics.GenericAPIView, mixins.ListModelMixin):
    permission_classes = (permissions.AllowAny,)
    queryset = Item.objects.all()
    lookup_field = 'zip_code'
    serializer_class = ItemSerializerPost

    def get(self, request, *args, **kwargs):
        results = list()

        #Filters items with a specific tag
        if(request.query_params.get("Tag") != ""):
            queryset = Item.objects.filter(tags__icontains=request.query_params.get("Tag"))
            results_list = list(queryset)
            for entry in results_list:
                results.append(ItemSerializerPost(entry).data)

        #Filters items from a specific listing
        if(request.query_params.get("Listing") != ""):
            queryset = list()
            if not results:
                queryset = Item.objects.filter(listing=request.query_params.get("Listing"))
            else:
                for entry in results:
                    if entry.listing == request.query_params.get("Listing"):
                        queryset.append(entry)
            results_list = list(queryset)
            results.clear()
            for entry in results_list:
                results.append(ItemSerializerPost(entry).data)

        #Sorts by sale distance from current user location
        if (request.query_params.get("Location") != ""):
            g = geocoder.ip('me')
            toSearch = list()
            if not results:
                queryset_a = Item.objects.all()
                toSearch = list(queryset_a)
            else:
                toSearch = results
            destinations = {}
            split_list = lambda lst, size: [lst[i:i+size] for i in range(0, len(lst), size)]
            sublists = split_list(toSearch, 25)
            for lists in sublists:
                url = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + str(g.latlng[0]) + "%2C" + str(g.latlng[1]) + "&destinations="
                for entry in lists:
                    url = url + entry.lat + "%2C" + entry.lng + "%7C"
                url = url[:-3] + "&key=" + settings.GOOGLE_API_KEY
                payload={}
                headers={}
                result = requests.request('GET', url, headers=headers, data=payload)
                toSave = json.loads(result.text)
                for i in range(len(lists)):
                    destinations[lists[i].pk] = (toSave["rows"][0]["elements"][i]["distance"]["value"])
                sortedDestinations = sorted(destinations.items(), key=lambda item: item[1])
                results.clear()
                for key in sortedDestinations:
                    results.append(ItemSerializerPost(Item.objects.get(pk = key[0])).data)

        #Sorts by sale ending time
        if (request.query_params.get("Date") != ""):
            results_list = list()
            if not results:
                results_list = list(Item.objects.order_by("end_time"))
            else: 
                results_list = sorted(results, key=lambda obj: getattr(obj, "end_time"))
            results.clear()
            for entry in results_list:
                results.append(ItemSerializerPost(entry).data)
        
        return Axios_response.ResponseSuccess(data = results, dataname = "Items",message='Sorted Items')
