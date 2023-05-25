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
from SpiffoList.axios import Axios_response


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

        daeta = {}
        item_results = list()
        listing_result = list()
        for entry in results_list:
            item_type = entry.__class__.__name__.lower()
            if isinstance(entry, Listing):
                serializer = ListingSerializerGet(entry)
                listing_result.append(serializer.data)
            if isinstance(entry, Item):
                serializer = ItemSerializerGet(entry)
                item_results.append(serializer.data)
        
        if not listing_result:
            return Response(Axios_response.Failed("No listing returned"))
        else:
            daeta["listing details"] = listing_result
            daeta["listing items"] = item_results
            return Axios_response.ResponseSuccess(data = daeta, dataname = "Listing",message='')


@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class ListingCreation(generics.GenericAPIView, mixins.CreateModelMixin):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = Listing.objects.all()
    serializer_class = ListingSerializerPost

    def post(self, request, *args, **kwargs):
        reqdata = request.data
        serializer = self.serializer_class(Item.objects.all(), data=reqdata, partial = True)
        if serializer.is_valid():
            return Axios_response.ResponseSuccess(data = self.create(request, *args, **kwargs).data, dataname = "Listing",message='Listing Created')
        else:
            return Response(Axios_response.Failed("Data is not in valid form"))

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
        if AppUser.objects.filter(pk=self.kwargs['owner']).exists():
            queryset_a = Listing.objects.filter(owner=self.kwargs['owner'])
            results_list = list(queryset_a)
            result = list()
            for entry in results_list:
                result.append(ListingSerializerGet(entry).data)
            return Axios_response.ResponseSuccess(data = result, dataname = "Listings",message='All Listings')
        else:
            return Response(Axios_response.Failed("User does not exist"))    

@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class ListingDelete(generics.GenericAPIView, mixins.DestroyModelMixin, mixins.RetrieveModelMixin):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = Listing.objects.all()
    lookup_field = 'pk'
    serializer_class = ListingSerializerGet

    def get(self, request, *args, **kwargs):
        if self.request.user.pk == Listing.objects.get(pk=self.kwargs['pk']).owner:
            return Axios_response.ResponseSuccess(data = self.retrieve(request, *args, **kwargs).data, dataname = "Listing",message='Listing Found')
        else:
            return Response(Axios_response.Failed("No listing returned")) 

    def delete(self, request, *args, **kwargs):
        if self.request.user.pk == Listing.objects.get(pk=self.kwargs['pk']).owner:
            if self.destroy(request, *args, **kwargs).status_code == 204:
                return Axios_response.ResponseSuccess(message='Listing Deleted')
            else:
                return Response(Axios_response.Failed("Listing was not successfully deleted"))
        else:
            return Response(Axios_response.Failed("Not logged in to the correct account"))

@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class ListingUpdate(generics.GenericAPIView, mixins.UpdateModelMixin, mixins.RetrieveModelMixin):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Listing.objects.all()
    lookup_field = 'pk'
    serializer_class = ListingSerializerPost
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        if self.request.user.pk == Listing.objects.get(pk=self.kwargs['pk']).owner:
            return Axios_response.ResponseSuccess(data = self.retrieve(request, *args, **kwargs).data, dataname = "Listing",message='Listing Found')
        else:
            return Response(Axios_response.Failed("No listing returned"))

    def post(self, request, *args, **kwargs):
        listing = Listing.objects.get(pk=self.kwargs['pk'])
        if self.request.user.pk == listing.owner:
            reqdata = request.data
            serializer = self.serializer_class(listing, data=reqdata, partial=True)
            if serializer.is_valid():
                return Axios_response.ResponseSuccess(data = self.update(request, *args, **kwargs).data, dataname = "Listing",message='Listing Updated')
            else:
                return Response(Axios_response.Failed("Data not in a valid form"))
        else:
            return Response(Axios_response.Failed("Not logged into the correct account"))
    
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
    serializer_class = ItemSerializerPost

    def post(self, request, *args, **kwargs):
        if Listing.objects.filter(pk=self.kwargs['pk']).exists():
            if self.request.user.pk == Listing.objects.get(pk=self.kwargs['pk']).owner:
                reqdata = request.data
                serializer = self.serializer_class(Item.objects.all(), data=reqdata, partial=True)
                serializer.is_valid(raise_exception=True)
                return Axios_response.ResponseSuccess(data = self.create(request, *args, **kwargs).data, dataname = "Item",message='Item created')
            else: 
                return Response(Axios_response.Failed("Not logged into the correct account"))
        else:
            return Response(Axios_response.Failed("Listing does not exist"))

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
    serializer_class = ItemSerializerGet

    def get(self, request, *args, **kwargs):
        if self.request.user.pk == Listing.objects.get(pk=self.kwargs['listpk']).owner:
            if Item.objects.get(pk=self.kwargs['itempk']).listing == self.kwargs['listpk']:
                return Axios_response.ResponseSuccess(data = self.retrieve(request, *args, **kwargs).data, dataname = "Item",message='Item Found')
            else:
                return Response(Axios_response.Failed("Listing does not contain given item"))
        else:               
            return Response(Axios_response.Failed("Not logged into the correct account"))

    def delete(self, request, *args, **kwargs):
        if self.request.user.pk == Listing.objects.get(pk=self.kwargs['listpk']).owner:
            if Item.objects.get(pk=self.kwargs['itempk']).listing == self.kwargs['listpk']:
                if self.destroy(request, *args, **kwargs).status_code == 204:
                    return Axios_response.ResponseSuccess(message='Item Deleted')
                else:
                    return Response(Axios_response.Failed("Item not deleted successfully"))
            else:
                return Response(Axios_response.Failed("Listing does not contain given item"))
        else:
            return Response(Axios_response.Failed("Not logged into the correct account"))


@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class ItemUpdate(generics.GenericAPIView, mixins.UpdateModelMixin, mixins.RetrieveModelMixin):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = Item.objects.all()
    lookup_field = 'pk'
    lookup_url_kwarg = 'itempk'
    serializer_class = ItemSerializerPost
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        if self.request.user.pk == Listing.objects.get(pk=self.kwargs['listpk']).owner:
            if Item.objects.get(pk=self.kwargs['itempk']).listing == self.kwargs['listpk']:
                return Axios_response.ResponseSuccess(data = self.retrieve(request, *args, **kwargs).data, dataname = "Item",message='Item Found')
            else:
                return Response(Axios_response.Failed("Listing does not contain given item"))
        else:
            return Response(Axios_response.Failed("Not logged into the correct account"))

    def post(self, request, *args, **kwargs):
        item=Item.objects.get(pk=self.kwargs['itempk'])
        if self.request.user.pk == item.owner:
            reqdata = request.data
            serializer = self.serializer_class(item, data=reqdata, partial=True)
            if serializer.is_valid():
                return Axios_response.ResponseSuccess(data = self.update(request, *args, **kwargs).data, dataname = "Item",message='Item Updated')
            else:
                return Response(Axios_response.Failed("Data not in valid form"))
        else:
            return Response(Axios_response.Failed("Not logged into the correct account"))
    
    def perform_update(self, serializer):
        serializer.save(listing=self.kwargs['listpk'], owner=Listing.objects.get(pk=self.kwargs['listpk']).owner, zip_code=Listing.objects.get(pk=self.kwargs['listpk']).zip_code, lat=Listing.objects.get(
            pk=self.kwargs['listpk']).lat, lng=Listing.objects.get(pk=self.kwargs['listpk']).lng, start_time=Listing.objects.get(pk=self.kwargs['listpk']).start_time, end_time=Listing.objects.get(pk=self.kwargs['listpk']).end_time)


@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class SpecificItem(generics.GenericAPIView, mixins.RetrieveModelMixin):
    permission_classes = (permissions.AllowAny, )
    queryset = Item.objects.all()
    lookup_field = 'pk'
    lookup_url_kwarg = 'itempk'
    serializer_class = ItemSerializerGet

    def get(self, request, *args, **kwargs):
        results = {}
        if Item.objects.get(pk=request.data.get('itemPK')).listing == request.data.get('listingsPK'):
            return Axios_response.ResponseSuccess(data = self.retrieve(request, *args, **kwargs).data, dataname = "Item",message='Item Found')
        else:
            return Response(Axios_response.Failed("Listing does not contain given item"))

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
