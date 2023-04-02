from listings.models import Listing, Item
from users.models import AppUser
from rest_framework import permissions, mixins, generics
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from listings.serializers import ListingSerializerPost, ListingSerializerGet, ItemSerializerGet, ItemSerializerPost
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator
import requests
from django.conf import settings


@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class SpecificListing(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny, )
    queryset = Listing.objects.all()
    serializer_class = ListingSerializerPost

    def get(self, request, *args, **kwargs):
        queryset_a = Listing.objects.get(pk=self.kwargs['pk'])
        queryset_b = Item.objects.filter(listing=self.kwargs['pk'])

        results_list = list(queryset_b)
        results_list.insert(0, queryset_a)

        results = {}
        data = {}
        item_results = list()
        listing_result = list()
        for entry in results_list:
            item_type = entry.__class__.__name__.lower()
            if isinstance(entry, Listing):
                serializer = ListingSerializerPost(entry)
                listing_result.append(serializer.data)
            if isinstance(entry, Item):
                serializer = ItemSerializerPost(entry)
                item_results.append(serializer.data)
        
        if not listing_result:
            results["result"] = "error"
            results["data"] = ""
            results["message"] = "No listing returned"
        else:
            results["result"] = "pass"
            data["listing details"] = listing_result
            data["listing items"] = item_results
            results["data"] = data
            results["message"] = ""
        return Response(results)


@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class ListingCreation(generics.GenericAPIView, mixins.CreateModelMixin):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = Listing.objects.all()
    serializer_class = ListingSerializerGet

    def post(self, request, *args, **kwargs):
        results = {}
        reqdata = request.data
        serializer = self.serializer_class(Item.objects.all(), data=reqdata, partial = True)
        if serializer.is_valid():
            results["result"] = "pass"
            results["data"] = self.create(request, *args, **kwargs).data
            results["message"] = ""
        else:
            results["result"] = "error"
            results["data"] = ""
            results["message"] = "Data not in valid form"
        return Response(results)

    def perform_create(self, serializer):
        result = requests.get('https://maps.googleapis.com/maps/api/geocode/json?', params={
                              'address': self.request.data['location'], 'key': settings.GOOGLE_API_KEY})
        location = result.json()
        for component in location['results'][0]['address_components']:
            if component['types'][0] == ('postal_code'):
                geozipcode = component['long_name']
        serializer.save(owner=self.request.user.pk, lat=location['results'][0]['geometry']['location']
                        ['lat'], lng=location['results'][0]['geometry']['location']['lng'], zip_code=geozipcode)


@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class ListListings(generics.GenericAPIView, mixins.ListModelMixin):
    permission_classes = (permissions.AllowAny,)
    queryset = Listing.objects.all()
    lookup_field = 'owner'
    serializer_class = ListingSerializerPost

    def get(self, request, *args, **kwargs):
        results = {}
        if AppUser.objects.filter(pk=self.kwargs['owner']).exists():
            queryset_a = Listing.objects.filter(owner=self.kwargs['owner'])
            results_list = list(queryset_a)
            result = list()
            for entry in results_list:
                result.append(ListingSerializerPost(entry).data)
            results["result"] = "pass"
            results["data"] = result
            results["message"] = ""
        else:
            results["result"] = "error"
            results["data"] = ""
            results["message"] = "User does not exist"
        return Response(results)
    

@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class ListingDelete(generics.GenericAPIView, mixins.DestroyModelMixin, mixins.RetrieveModelMixin):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = Listing.objects.all()
    lookup_field = 'pk'
    serializer_class = ListingSerializerPost

    def get(self, request, *args, **kwargs):
        results = {}
        if self.request.user.pk == Listing.objects.get(pk=self.kwargs['pk']).owner:
            results["result"] = "pass"
            results["data"] = self.retrieve(request, *args, **kwargs).data
            results["message"] = ""
        else:
            results["result"] = "error"
            results["data"] = ""
            results["message"] = "No listing returned"
        return Response(results)

    def delete(self, request, *args, **kwargs):
        results = {}
        if self.request.user.pk == Listing.objects.get(pk=self.kwargs['pk']).owner:
            if self.destroy(request, *args, **kwargs).status_code == 204:
                results["result"] = "pass"
                results["data"] = ""
                results["message"] = ""
            else:
                results["result"] = "error"
                results["data"] = ""
                results["message"] = "Listing was not successfully deleted"
        else:
            results["result"] = "error"
            results["data"] = ""
            results["message"] = "Not logged in to the correct account"
        return Response(results)

@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class ListingUpdate(generics.GenericAPIView, mixins.UpdateModelMixin, mixins.RetrieveModelMixin):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Listing.objects.all()
    lookup_field = 'pk'
    serializer_class = ListingSerializerGet
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        results = {}
        if self.request.user.pk == Listing.objects.get(pk=self.kwargs['pk']).owner:
            results["result"] = "pass"
            results["data"] = self.retrieve(request, *args, **kwargs).data
            results["message"] = ""
        else:
            results["result"] = "error"
            results["data"] = ""
            results["message"] = "No listing returned"
        return Response(results)

    def post(self, request, *args, **kwargs):
        results = {}
        listing = Listing.objects.get(pk=self.kwargs['pk'])
        if self.request.user.pk == listing.owner:
            reqdata = request.data
            serializer = self.serializer_class(listing, data=reqdata, partial=True)
            if serializer.is_valid():
                results["result"] = "pass"
                results["data"] = self.update(request, *args, **kwargs).data
                results["message"]= ""
            else:
                results["result"]  = "error"
                results["data"] = ""
                results["message"] = "Data not in a valid form"
        else:
            results["result"]  = "error"
            results["data"] = ""
            results["message"] = "Not logged into the correct account"
        return Response(results)
    
    def perform_update(self, serializer):
        result = requests.get('https://maps.googleapis.com/maps/api/geocode/json?', params={
                              'address': self.request.data['location'], 'key': settings.GOOGLE_API_KEY})
        location = result.json()
        for component in location['results'][0]['address_components']:
            if component['types'][0] == ('postal_code'):
                geozipcode = component['long_name']
        serializer.save(owner=self.request.user.pk, lat=location['results'][0]['geometry']['location']
                        ['lat'], lng=location['results'][0]['geometry']['location']['lng'], zip_code=geozipcode)


@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class ItemCreation(generics.GenericAPIView, mixins.CreateModelMixin):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = Item.objects.all()
    serializer_class = ItemSerializerGet

    def post(self, request, *args, **kwargs):
        results = {}
        if Listing.objects.filter(pk=self.kwargs['pk']).exists():
            if self.request.user.pk == Listing.objects.get(pk=self.kwargs['pk']).owner:
                reqdata = request.data
                serializer = self.serializer_class(Item.objects.all(), data=reqdata, partial=True)
                serializer.is_valid(raise_exception=True)
                results["result"] = "pass"
                results["data"] = self.create(request, *args, **kwargs).data
                results["message"] = ""
            else: 
                results["result"] = "error"
                results["data"] = ""
                results["message"] = "Not logged in to the correct account"
        else:
            results["result"] = "error"
            results["data"] = ""
            results["message"] = "Listing does not exist"
        return Response(results)

    def perform_create(self, serializer):
        serializer.save(listing=self.kwargs['pk'], owner=Listing.objects.get(pk=self.kwargs['pk']).owner, zip_code=Listing.objects.get(pk=self.kwargs['pk']).zip_code, lat=Listing.objects.get(
            pk=self.kwargs['pk']).lat, lng=Listing.objects.get(pk=self.kwargs['pk']).lng, start_time=Listing.objects.get(pk=self.kwargs['pk']).start_time, end_time=Listing.objects.get(pk=self.kwargs['pk']).end_time)


@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class ItemDelete(generics.GenericAPIView, mixins.DestroyModelMixin, mixins.RetrieveModelMixin):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = Item.objects.all()
    lookup_field = 'pk'
    lookup_url_kwarg = 'itempk'
    serializer_class = ItemSerializerPost

    def get(self, request, *args, **kwargs):
        results = {}
        if self.request.user.pk == Listing.objects.get(pk=self.kwargs['listpk']).owner:
            if Item.objects.get(pk=self.kwargs['itempk']).listing == self.kwargs['listpk']:
                results["result"] = "pass"
                results["data"] = self.retrieve(request, *args, **kwargs).data
                results["message"] = ""
            else:
                results["result"] = "error"
                results["data"] = ""
                results["message"] = "Listing does not contain given item"
        else:               
            results["result"] = "error"
            results["data"] = ""
            results["message"] = "Not logged in to the correct account"
        return Response(results)

    def delete(self, request, *args, **kwargs):
        results = {}
        if self.request.user.pk == Listing.objects.get(pk=self.kwargs['listpk']).owner:
            if Item.objects.get(pk=self.kwargs['itempk']).listing == self.kwargs['listpk']:
                if self.destroy(request, *args, **kwargs).status_code == 204:
                    results["result"] = "pass"
                    results["data"] = ""
                    results["message"] = ""
                else:
                    results["result"] = "error"
                    results["data"] = ""
                    results["message"] = "Item not deleted successfully"
            else:
                results["result"] = "error"
                results["data"] = ""
                results["message"] = "Listing does not contain given item"
        else:
            results["result"] = "error"
            results["data"] = ""
            results["message"] = "Not logged in to the correct account"
        return Response(results)


@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class ItemUpdate(generics.GenericAPIView, mixins.UpdateModelMixin, mixins.RetrieveModelMixin):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = Item.objects.all()
    lookup_field = 'pk'
    lookup_url_kwarg = 'itempk'
    serializer_class = ItemSerializerGet
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        results = {}
        if self.request.user.pk == Listing.objects.get(pk=self.kwargs['listpk']).owner:
            if Item.objects.get(pk=self.kwargs['itempk']).listing == self.kwargs['listpk']:
                results["result"] = "pass"
                results["data"] = self.retrieve(request, *args, **kwargs).data
                results["message"] = ""
            else:
                results["result"] = "error"
                results["data"] = ""
                results["message"] = "Listing does not contain given item"
        else:
            results["result"] = "error"
            results["data"] = ""
            results["message"] = "Not logged in to the correct account" 
        return Response(results)

    def post(self, request, *args, **kwargs):
        results = {}
        item=Item.objects.get(pk=self.kwargs['listpk'])
        if self.request.user.pk == item.owner:
            reqdata = request.data
            serializer = self.serializer_class(item, data=reqdata, partial=True)
            if serializer.is_valid():
                results["result"] = "pass"
                results["data"] = self.update(request, *args, **kwargs).data
                results["message"]= ""
            else:
                results["result"]  = "error"
                results["data"] = ""
                results["message"] = "Data not in a valid form"
        else:
            results["result"] = "error"
            results["data"] = ""
            results["message"] = "Not logged in to the correct account"
        return Response(results)
    
    def perform_update(self, serializer):
        serializer.save(listing=self.kwargs['pk'], owner=Listing.objects.get(pk=self.kwargs['pk']).owner, zip_code=Listing.objects.get(pk=self.kwargs['pk']).zip_code, lat=Listing.objects.get(
            pk=self.kwargs['pk']).lat, lng=Listing.objects.get(pk=self.kwargs['pk']).lng, start_time=Listing.objects.get(pk=self.kwargs['pk']).start_time, end_time=Listing.objects.get(pk=self.kwargs['pk']).end_time)


@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class SpecificItem(generics.GenericAPIView, mixins.RetrieveModelMixin):
    permission_classes = (permissions.AllowAny, )
    queryset = Item.objects.all()
    lookup_field = 'pk'
    lookup_url_kwarg = 'itempk'
    serializer_class = ItemSerializerPost

    def get(self, request, *args, **kwargs):
        results = {}
        if Item.objects.get(pk=request.data.get('itemPK')).listing == request.data.get('listingsPK'):
            results["result"] = "pass"
            results["data"] = self.retrieve(request, *args, **kwargs).data
            results["message"] = ""
        else:
            results["result"] = "error"
            results["data"] = ""
            results["message"] = "Listing does not contain given item"
        return Response(results)

# Need to add in caveats for if keys entered into url exist
# Need to add on cascade delete

# in case the update breaks:
# def post(self, request, *args, **kwargs):
#   results = {}
#   item=Item.objects.get(pk=self.kwargs['listpk'])
#   if self.request.user.pk == item.owner:
#       reqdata = request.data
#       serializer = self.serializer_class(item, data=reqdata, partial=True)
#       serializer.is_valid(raise_exception=True)
#       serializer.save()
#       results["result"] = "pass"
#       results["data"] = serializer.data
#       results["message"] = ""
#   else:
#       results["result"] = "error"
#       results["data"] = ""
#       results["message"] = "Not logged in to the correct account"
#   return Response(results)
