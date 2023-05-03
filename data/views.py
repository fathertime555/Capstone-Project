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
import random
import json
from django.conf import settings


@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class ListItems(generics.GenericAPIView, mixins.ListModelMixin):
    permission_classes = (permissions.AllowAny,)
    queryset = Item.objects.all()
    lookup_field = 'pk'
    serializer_class = ItemSerializerPost

    def get(self, request, *args, **kwargs):
        results = {}
        results["result"] = "pass"
        results["data"] = self.list(request, *args, **kwargs).data
        return Response(results)


@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class ListListings(generics.GenericAPIView, mixins.ListModelMixin):
    permission_classes = (permissions.AllowAny,)
    queryset = Listing.objects.all()
    lookup_field = 'pk'
    serializer_class = ListingSerializerPost

    def get(self, request, *args, **kwargs):
        results = {}
        results["result"] = "pass"
        results["data"] = self.list(request, *args, **kwargs).data
        return Response(results)


@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class ListBoth(generics.GenericAPIView, mixins.ListModelMixin):
    permission_classes = (permissions.AllowAny,)
    queryset = Listing.objects.all()
    serializer_class = ListingSerializerPost

    def get(self, request, *args, **kwargs):
        results = {}
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

        results["result"] = "pass"
        results["data"] = data
        results["message"] = ""

        return Response(results)


@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class SortListingsByLocation(generics.GenericAPIView, mixins.ListModelMixin):
    permission_classes = (permissions.AllowAny,)
    queryset = Listing.objects.all()
    lookup_field = 'zip_code'
    serializer_class = ListingSerializerPost

    def get(self, request, *args, **kwargs):
        results = {}
        userLat = request.query_params["lat"]
        userLong = request.query_params["lng"]
        origin = f'{userLat}, {userLong}'
        queryset_a = Listing.objects.filter(
            zip_code=request.query_params["zip_code"])
        toSearch = list(queryset_a)
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
            sortedDestinations[destinations["destination_addresses"]
                               [index]] = s["distance"]["value"]
            index = index + 1
        sortedDestinations = sorted(
            sortedDestinations.items(), key=lambda item: item[1])
        toReturn = list()
        for key in sortedDestinations:
            x = key.split(", ")
            toReturn.append(ListingSerializerPost(
                Listing.objects.get(lat=x[0], lng=x[1])).data)
        if not toReturn:
            results["result"] = "error"
            results["data"] = ""
            results["message"] = "No listings returned"
        else:
            results["result"] = "pass"
            results["data"] = toReturn
            results["message"] = ""
        return Response(results)


@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class SortItemsByLocation(generics.GenericAPIView, mixins.ListModelMixin):
    permission_classes = (permissions.AllowAny,)
    queryset = Item.objects.all()
    lookup_field = 'zip_code'
    serializer_class = ItemSerializerPost

    def get(self, request, *args, **kwargs):
        results = {}
        userLat = request.query_params["lat"]
        userLong = request.query_params["lng"]
        origin = f'{userLat}, {userLong}'
        queryset_a = Item.objects.filter(
            zip_code=request.query_params["zip_code"])
        toSearch = list(queryset_a)
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
            sortedDestinations[destinations["destination_addresses"]
                               [index]] = s["distance"]["value"]
            index = index + 1
        sortedDestinations = sorted(
            sortedDestinations.items(), key=lambda item: item[1])
        toReturn = list()
        for key in sortedDestinations:
            x = key.split(", ")
            toReturn.append(ItemSerializerPost(
                Item.objects.get(lat=x[0], lng=x[1])).data)
        if not toReturn:
            results["result"] = "error"
            results["data"] = ""
            results["message"] = "No items returned"
        else:
            results["result"] = "pass"
            results["data"] = toReturn
            results["message"] = ""
        return Response(results)


@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class SortListingsByTheme(generics.GenericAPIView, mixins.ListModelMixin):
    permission_classes = (permissions.AllowAny,)
    queryset = Listing.objects.all()
    lookup_field = 'theme'
    serializer_class = ListingSerializerPost

    def get(self, request, *args, **kwargs):
        results = {}
        queryset_a = Listing.objects.filter(
            theme__icontains=request.query_params["theme"])
        results_list = list(queryset_a)
        result = list()
        for entry in results_list:
            result.append(ListingSerializerPost(entry).data)
        if not result:
            results["result"] = "error"
            results["data"] = ""
            results["message"] = "No listings returned"
        else:
            results["result"] = "pass"
            results["data"] = result
            results["message"] = ""
        return Response(results)


@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class SortItemsByListing(generics.GenericAPIView, mixins.ListModelMixin):
    permission_classes = (permissions.AllowAny,)
    queryset = Item.objects.all()
    lookup_field = 'listing'
    serializer_class = ItemSerializerPost

    def get(self, request, *args, **kwargs):
        results = {}
        queryset = Item.objects.filter(listing=self.kwargs['pk'])
        results_list = list(queryset)
        result = list()
        for entry in results_list:
            result.append(ItemSerializerPost(entry).data)
        if not result:
            results["result"] = "error"
            results["data"] = ""
            results["message"] = "No items returned"
        else:
            results["result"] = "pass"
            results["data"] = result
            results["message"] = ""
        return Response(results)


@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class SortItemsByTag(generics.GenericAPIView, mixins.ListModelMixin):
    permission_classes = (permissions.AllowAny,)
    queryset = Item.objects.all()
    lookup_field = 'tags'
    serializer_class = ItemSerializerPost

    def get(self, request, *args, **kwargs):
        results = {}
        queryset_a = Item.objects.filter(
            tags__icontains=request.query_params["tags"])
        results_list = list(queryset_a)
        result = list()
        for entry in results_list:
            result.append(ItemSerializerPost(entry).data)
        if not result:
            results["result"] = "error"
            results["data"] = ""
            results["message"] = "No items returned"
        else:
            results["result"] = "pass"
            results["data"] = result
            results["message"] = ""
        return Response(results)


@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class SortListingsByDate(generics.GenericAPIView, mixins.ListModelMixin):
    permission_classes = (permissions.AllowAny,)
    queryset = Listing.objects.all().order_by('start_time')
    lookup_field = 'start_time'
    serializer_class = ListingSerializerPost

    def get(self, request, *args, **kwargs):
        results = {}
        results["result"] = "pass"
        results["data"] = self.list(request, *args, **kwargs).data
        results["message"] = ""
        return Response(results)


@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class SortItemsByDate(generics.GenericAPIView, mixins.ListModelMixin):
    permission_classes = (permissions.AllowAny,)
    queryset = Item.objects.all().order_by('start_time')
    lookup_field = 'start_time'
    serializer_class = ItemSerializerPost

    def get(self, request, *args, **kwargs):
        results = {}
        results["result"] = "pass"
        results["data"] = self.list(request, *args, **kwargs).data
        results["message"] = ""
        return Response(results)


@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class CreatedummyData(generics.GenericAPIView, mixins.ListModelMixin):
    permission_classes = (permissions.AllowAny,)

    # create dummy user

    def get(self, request, *args, **kwargs):
        dummyaddress = json.load(open('static/dummyaddress.json'))
        dummyaddress_index = 0
        dummyitem = json.load(open('static/dummyitem.json'))
        itemname = dummyitem["itemname"]
        itemname_num = dummyitem["itemname_num"]
        itemc = dummyitem["condition"]
        itemc_num = dummyitem["condition_num"]
        Listing.objects.all().delete()
        Item.objects.all().delete()
        for i in range(1, 100):
            uname = 'user'+str(i)
            p = AppUser.objects.filter(username=uname)
            p.delete()

        Response({'status': 'done'})

        def create_dummy_user(index):
            user = AppUser.objects.create_user(
                username="user"+str(index), password="12345678", email="user"+str(index)+"@gmail.com")
            return user

        def create_dummy_listing(index, j_index, user, dummyaddress_index):
            address = dummyaddress[dummyaddress_index]

            lists = Listing.objects.create(owner=user.id, title='Listing_'+str(index)+'_'+str(
                j_index), location=address['Address'], lat=address['Latitude'], lng=address['Longitude'], zip_code=address['Zip'])
            return lists

        def create_dummy_item(index, j_index, k_index, user, dummy_listing):
            itemn = itemname[random.randrange(0, itemname_num)]
            tag = itemc[random.randrange(0, itemc_num)]
            Item.objects.create(owner=user.id, name='Item_'+str(index)+'_'+str(j_index)+str(k_index)+' '+itemn, tags=tag, price=random.randrange(1, 100)*0.9999, quantity=random.randrange(
                1, 10), description=tag+" "+itemn, lat=dummy_listing.lat, lng=dummy_listing.lng, zip_code=dummy_listing.zip_code, listing=dummy_listing.id)

        for i in range(1, 100):
            user = create_dummy_user(i)
            for j in range(1, 4):
                d_list = create_dummy_listing(i, j, user, dummyaddress_index)
                dummyaddress_index = dummyaddress_index+1
                for k in range(1, 10):
                    create_dummy_item(i, j, k, user, d_list)

        # for i in range(2, 100):
        #     user = AppUser.objects.get(username='user'+str(i))
        #     if (user.DoesNotExist):
        #         user = AppUser.objects.create_user(
        #             username="user"+str(i), password="12345678", email="user"+str(i)+"@gmail.com")
        #     listnum = random.randrange(1, 3)
        #     for j in (1, listnum):
        #         address = dummyaddress[dummyaddress_index]
        #         dummyaddress_index = dummyaddress_index+1
        #         lists = Listing.objects.create(owner=user.id, title='Listing_'+str(i)+'_'+str(
        #             j), location=address['Address'], lat=address['Latitude'], lng=address['Longitude'], zip_code=address['Zip'])
        #         for k in (1, random.randrange(1, 10)):
        #             itemn = itemname[random.randrange(0, itemname_num)]
        #             tag = itemc[random.randrange(0, itemc_num)]
        #             Item.objects.create(owner=user.id, name='Item_'+str(i)+'_'+str(j)+str(k)+' '+itemn, tags=tag, price=random.randrange(0.99, 99.99), quantity=random.randrange(
        #                 1, 10), description=tag+" "+itemn, location=address['Address'], lat=address['Latitude'], lng=address['Longitude'], zip_code=address['Zip'])
