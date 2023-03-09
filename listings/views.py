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

parser_classes=(MultiPartParser,FormParser)

@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class SpecificListing(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny, )
    queryset = Listing.objects.all()
    serializer_class = ListingSerializerPost 
    
    def get (self, request, *args, **kwargs):    
        queryset_a = Listing.objects.get(pk=self.kwargs['pk'])
        queryset_b = Item.objects.filter(listing=self.kwargs['pk'])

        results_list = list(queryset_b)
        results_list.insert(0,queryset_a)

        results = {}
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
        results["listing details"] = listing_result
        results["listing items"] = item_results

        return Response(results)

@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class ListingCreation(generics.GenericAPIView, mixins.CreateModelMixin):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = Listing.objects.all()
    serializer_class = ListingSerializerGet

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def perform_create(self, serializer):
        result=requests.get('https://maps.googleapis.com/maps/api/geocode/json?', params={'address': self.request.data['location'], 'key': settings.GOOGLE_API_KEY})
        location=result.json()
        for component in location['results'][0]['address_components']:
            if component['types'][0] == ('postal_code'):
                geozipcode = component['long_name'] 
        serializer.save(owner=self.request.user.pk, lat=location['results'][0]['geometry']['location']['lat'], lng=location['results'][0]['geometry']['location']['lng'], zip_code=geozipcode)
    
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
            results = list()
            for entry in results_list:
                results.append(ListingSerializerPost(entry).data)
            return Response(results)
        return Response({ 'error': 'User does not exist'})

@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class SortListingsByLocation(generics.GenericAPIView, mixins.ListModelMixin):
    permission_classes = (permissions.AllowAny,)
    queryset = Listing.objects.all()
    lookup_field = 'zip_code'
    serializer_class = ListingSerializerPost  
    def get(self, request, *args, **kwargs):
        userLat = request.query_params["lat"]
        userLong = request.query_params["lng"]
        origin = f'{userLat}, {userLong}'
        queryset_a = Listing.objects.filter(zip_code=request.query_params["zip_code"])
        toSearch = list(queryset_a)
        destination = list()
        for entry in toSearch:
            destLat = entry.lat
            destLong = entry.lng
            destination.append(f'{destLat}, {destLong}')
        result=requests.get('https://maps.googleapis.com/maps/api/distancematrix/json?', params={'origin': origin, 'destination': destination, 'key': settings.GOOGLE_API_KEY})
        destinations = result.json()
        sortedDestinations = {}
        index = 0
        for s in destinations["rows"][0]["elements"]:
            sortedDestinations[destinations["destination_addresses"][index]] = s["distance"]["value"]
            index = index + 1
        sortedDestinations = sorted(sortedDestinations.items(), key=lambda item: item[1])
        toReturn = list()
        for key in sortedDestinations:
            x = key.split(", ")
            toReturn.append(ListingSerializerPost(Listing.objects.get(lat=x[0], lng=x[1])).data)
        return Response(toReturn)


@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class SortItemsByLocation(generics.GenericAPIView, mixins.ListModelMixin):
    permission_classes = (permissions.AllowAny,)
    queryset = Item.objects.all()
    lookup_field = 'zip_code'
    serializer_class = ItemSerializerPost  
    def get(self, request, *args, **kwargs):
        userLat = request.query_params["lat"]
        userLong = request.query_params["lng"]
        origin = f'{userLat}, {userLong}'
        queryset_a = Item.objects.filter(zip_code=request.query_params["zip_code"])
        toSearch = list(queryset_a)
        destination = list()
        for entry in toSearch:
            destLat = entry.lat
            destLong = entry.lng
            destination.append(f'{destLat}, {destLong}')
        result=requests.get('https://maps.googleapis.com/maps/api/distancematrix/json?', params={'origin': origin, 'destination': destination, 'key': settings.GOOGLE_API_KEY})
        destinations = result.json()
        sortedDestinations = {}
        index = 0
        for s in destinations["rows"][0]["elements"][0]:
            sortedDestinations[destinations["destination_addresses"][index]] = s["distance"]["value"]
            index = index + 1
        sortedDestinations = sorted(sortedDestinations.items(), key=lambda item: item[1])
        toReturn = list()
        for key in sortedDestinations:
            x = key.split(", ")
            toReturn.append(ItemSerializerPost(Item.objects.get(lat=x[0], lng=x[1])).data)
        return Response(toReturn)

        

@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class SortListingsByTheme(generics.GenericAPIView, mixins.ListModelMixin):
    permission_classes = (permissions.AllowAny,)
    queryset = Listing.objects.all()
    lookup_field = 'theme'
    serializer_class = ListingSerializerPost  
    def get(self, request, *args, **kwargs):
        queryset_a = Listing.objects.filter(theme__icontains=request.query_params["theme"])
        results_list = list(queryset_a)
        results = list()
        for entry in results_list:
            results.append(ListingSerializerPost(entry).data)
        return Response(results)

@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class SortItemsByListing(generics.GenericAPIView, mixins.ListModelMixin):
    permission_classes = (permissions.AllowAny,)
    queryset = Item.objects.all()
    lookup_field = 'listing'
    serializer_class = ItemSerializerPost  
    def get(self, request, *args, **kwargs):
        queryset = Item.objects.filter(listing = self.kwargs['pk'])
        results_list = list(queryset)
        results = list()
        for entry in results_list:
            results.append(ItemSerializerPost(entry).data)
        return Response(results)

@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class SortItemsByTag(generics.GenericAPIView, mixins.ListModelMixin):
    permission_classes = (permissions.AllowAny,)
    queryset = Item.objects.all()
    lookup_field = 'tags'
    serializer_class = ItemSerializerPost  
    def get(self, request, *args, **kwargs):
        queryset_a = Item.objects.filter(tags__icontains=request.query_params["tags"])
        results_list = list(queryset_a)
        results = list()
        for entry in results_list:
            results.append(ItemSerializerPost(entry).data)
        return Response(results)

@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class SortListingsByDate(generics.GenericAPIView, mixins.ListModelMixin):
    permission_classes = (permissions.AllowAny,)
    queryset = Listing.objects.all().order_by('start_time')
    lookup_field = 'start_time'
    serializer_class = ListingSerializerPost  
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
    
@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class SortItemsByDate(generics.GenericAPIView, mixins.ListModelMixin):
    permission_classes = (permissions.AllowAny,)
    queryset = Item.objects.all().order_by('start_time')
    lookup_field = 'start_time'
    serializer_class = ItemSerializerPost  
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class ListingDelete(generics.GenericAPIView, mixins.DestroyModelMixin, mixins.RetrieveModelMixin):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = Listing.objects.all()
    lookup_field = 'pk'
    serializer_class = ListingSerializerPost

    def get (self, request, *args, **kwargs):
        if self.request.user.pk == Listing.objects.get(pk=self.kwargs['pk']).owner:
            return self.retrieve(request, *args, **kwargs)
        return Response({ 'error': 'Not logged in to the correct account'})

    def delete(self, request, *args, **kwargs):
        if self.request.user.pk == Listing.objects.get(pk=self.kwargs['pk']).owner:    
            if self.destroy(request, *args, **kwargs).status_code == 204:
                return Response({ 'success': 'Listing deleted successfully' }) 
            return Response({ 'error': 'Listing was not successfully deleted'})
        return Response({ 'error': 'Not logged in to the correct account'})

@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class ListingUpdate(generics.GenericAPIView, mixins.UpdateModelMixin, mixins.RetrieveModelMixin):
    permission_classes = (permissions.IsAuthenticated,   )
    queryset = Listing.objects.all()
    lookup_field = 'pk'
    serializer_class = ListingSerializerGet

    def get (self, request, *args, **kwargs):
        if self.request.user.pk == Listing.objects.get(pk=self.kwargs['pk']).owner:
            return self.retrieve(request, *args, **kwargs)  
        return Response({ 'error': 'Not logged in to the correct account'})

    def post(self, request, *args, **kwargs):
        if self.request.user.pk == Listing.objects.get(pk=self.kwargs['pk']).owner:
            return self.update(request, *args, **kwargs)
        return Response({ 'error': 'Not logged in to the correct account'})

@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class ItemCreation(generics.GenericAPIView, mixins.CreateModelMixin):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = Item.objects.all()
    serializer_class = ItemSerializerGet

    def post(self, request, *args, **kwargs):
        if self.request.user.pk == Listing.objects.get(pk=self.kwargs['pk']).owner:
            return self.create(request, *args, **kwargs)
        return Response({ 'error': 'Not logged in to the correct account'})

    def perform_create(self, serializer):
        if Listing.objects.filter(pk=self.kwargs['pk']).exists():
            serializer.save(listing=self.kwargs['pk'], owner = Listing.objects.get(pk=self.kwargs['pk']).owner, zip_code = Listing.objects.get(pk=self.kwargs['pk']).zip_code, lat = Listing.objects.get(pk=self.kwargs['pk']).lat, lng = Listing.objects.get(pk=self.kwargs['pk']).lng, start_time = Listing.objects.get(pk=self.kwargs['pk']).start_time, end_time = Listing.objects.get(pk=self.kwargs['pk']).end_time)
        else:
            return Response({ 'error': 'Listing does not exist'})

@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class ItemDelete(generics.GenericAPIView, mixins.DestroyModelMixin, mixins.RetrieveModelMixin):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = Item.objects.all()
    lookup_field = 'pk'
    lookup_url_kwarg = 'itempk'
    serializer_class = ItemSerializerPost

    def get (self, request, *args, **kwargs):
        if self.request.user.pk == Listing.objects.get(pk=self.kwargs['listpk']).owner:    
            if Item.objects.get(pk=self.kwargs['itempk']).listing == self.kwargs['listpk']:
                return self.retrieve(request, *args, **kwargs)
            return Response({'error': 'Listing does not contain given item'})
        return Response({ 'error': 'Not logged in to the correct account'})

    def delete(self, request, *args, **kwargs):
        if self.request.user.pk == Listing.objects.get(pk=self.kwargs['listpk']).owner:    
            if Item.objects.get(pk=self.kwargs['itempk']).listing == self.kwargs['listpk']:
                if self.destroy(request, *args, **kwargs).status_code == 204:
                    return Response({ 'success': 'Item deleted successfully' }) 
                return Response({ 'error': 'Listing was not successfully deleted'})
            return Response({'error': 'Listing does not contain given item'})
        return Response({ 'error': 'Not logged in to the correct account'})

@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class ItemUpdate(generics.GenericAPIView, mixins.UpdateModelMixin, mixins.RetrieveModelMixin):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = Item.objects.all()
    lookup_field = 'pk'
    lookup_url_kwarg = 'itempk'
    serializer_class = ItemSerializerGet

    def get (self, request, *args, **kwargs):
        if self.request.user.pk == Listing.objects.get(pk=self.kwargs['listpk']).owner:
            if Item.objects.get(pk=self.kwargs['itempk']).listing == self.kwargs['listpk']:
                return self.retrieve(request, *args, **kwargs)
            return Response({'error': 'Listing does not contain given item'})  
        return Response({ 'error': 'Not logged in to the correct account'})

    def put(self, request, *args, **kwargs):
        if self.request.user.pk == Listing.objects.get(pk=self.kwargs['listpk']).owner:
            if Item.objects.get(pk=self.kwargs['itempk']).listing == self.kwargs['listpk']:           
                return self.update(request, *args, **kwargs)
            return Response({'error': 'Listing does not contain given item'})    
        return Response({ 'error': 'Not logged in to the correct account'})

@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class SpecificItem(generics.GenericAPIView, mixins.RetrieveModelMixin):
    permission_classes = (permissions.AllowAny, )
    queryset = Item.objects.all()
    lookup_field = 'pk'
    lookup_url_kwarg = 'itempk'
    serializer_class = ItemSerializerPost

    def get (self, request, *args, **kwargs):
        if Item.objects.get(pk=request.data.get('itemPK')).listing == request.data.get('listingsPK'):           
            return self.retrieve(request, *args, **kwargs)
        return Response({'error': 'Listing does not contain given item'})

#Need to add in caveats for if keys entered into url exist
#Need to add on cascade delete
       
