from django.contrib.auth.models import User
from listings.models import Listing, Item
from users.models import AppUser
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework import permissions, mixins, generics
from django.contrib import auth
from rest_framework.response import Response
from listings.serializers import ListingSerializerPost, ListingSerializerGet, ItemSerializerGet, ItemSerializerPost
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator

@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class SpecificListing(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny, )
    queryset = Listing.objects.all()
    serializer_class = ListingSerializerPost 
    def get (self, request, *args, **kwargs):    
        queryset_a = Listing.objects.get(pk=self.kwargs['pk'])
        queryset_b = Item.objects.filter(listing=self.kwargs['pk'])

        # Create an iterator for the querysets and turn it into a list.
        results_list = list(queryset_b)
        results_list.insert(0,queryset_a)

        # Build the list with items based on the FeedItemSerializer fields
        results = list()
        for entry in results_list:
            item_type = entry.__class__.__name__.lower()
            if isinstance(entry, Listing):
                serializer = ListingSerializerPost(entry)
            if isinstance(entry, Item):
                serializer = ItemSerializerPost(entry)
            results.append(serializer.data)

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
        serializer.save(owner=self.request.user.username)
    
@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class ListListings(generics.GenericAPIView, mixins.ListModelMixin):
    permission_classes = (permissions.AllowAny,)
    queryset = Listing.objects.all()
    lookup_field = 'owner'
    serializer_class = ListingSerializerPost  
    def get(self, request, *args, **kwargs):
        if AppUser.objects.filter(username=self.kwargs['owner']).exists():
            return self.list(request, *args, **kwargs)
        return Response({ 'error': 'Username does not exist'})

@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class ListingDelete(generics.GenericAPIView, mixins.DestroyModelMixin, mixins.RetrieveModelMixin):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = Listing.objects.all()
    lookup_field = 'pk'
    serializer_class = ListingSerializerPost

    def get (self, request, *args, **kwargs):
        if self.request.user.username == Listing.objects.get(pk=self.kwargs['pk']).owner:
            return self.retrieve(request, *args, **kwargs)
        return Response({ 'error': 'Not logged in to the correct account'})

    def delete(self, request, *args, **kwargs):
        if self.request.user.username == Listing.objects.get(pk=self.kwargs['pk']).owner:    
            if self.destroy(request, *args, **kwargs).status_code == 204:
                return Response({ 'success': 'Listing deleted successfully' }) 
            return Response({ 'error': 'Listing was not successfully deleted'})
        return Response({ 'error': 'Not logged in to the correct account'})

@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class ListingUpdate(generics.GenericAPIView, mixins.UpdateModelMixin, mixins.RetrieveModelMixin):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = Listing.objects.all()
    lookup_field = 'pk'
    serializer_class = ListingSerializerGet

    def get (self, request, *args, **kwargs):
        if self.request.user.username == Listing.objects.get(pk=self.kwargs['pk']).owner:
            return self.retrieve(request, *args, **kwargs)  
        return Response({ 'error': 'Not logged in to the correct account'})

    def put(self, request, *args, **kwargs):
        if self.request.user.username == Listing.objects.get(pk=self.kwargs['pk']).owner:
            return self.update(request, *args, **kwargs)
        return Response({ 'error': 'Not logged in to the correct account'})

@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class ItemCreation(generics.GenericAPIView, mixins.CreateModelMixin):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = Item.objects.all()
    serializer_class = ItemSerializerGet

    def post(self, request, *args, **kwargs):
        if self.request.user.username == Listing.objects.get(pk=self.kwargs['pk']).owner:
            return self.create(request, *args, **kwargs)
        return Response({ 'error': 'Not logged in to the correct account'})

    def perform_create(self, serializer):
        if Listing.objects.filter(pk=self.kwargs['pk']).exists():
            serializer.save(listing=self.kwargs['pk'], owner = Listing.objects.get(pk=self.kwargs['pk']).owner)
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
        if self.request.user.username == Listing.objects.get(pk=self.kwargs['listpk']).owner:    
            if Item.objects.get(pk=self.kwargs['itempk']).listing == self.kwargs['listpk']:
                return self.retrieve(request, *args, **kwargs)
            return Response({'error': 'Listing does not contain given item'})
        return Response({ 'error': 'Not logged in to the correct account'})

    def delete(self, request, *args, **kwargs):
        if self.request.user.username == Listing.objects.get(pk=self.kwargs['listpk']).owner:    
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
        if self.request.user.username == Listing.objects.get(pk=self.kwargs['listpk']).owner:
            if Item.objects.get(pk=self.kwargs['itempk']).listing == self.kwargs['listpk']:
                return self.retrieve(request, *args, **kwargs)
            return Response({'error': 'Listing does not contain given item'})  
        return Response({ 'error': 'Not logged in to the correct account'})

    def put(self, request, *args, **kwargs):
        if self.request.user.username == Listing.objects.get(pk=self.kwargs['listpk']).owner:
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
        if Item.objects.get(pk=self.kwargs['itempk']).listing == self.kwargs['listpk']:           
            return self.retrieve(request, *args, **kwargs)
        return Response({'error': 'Listing does not contain given item'})

#Need to add in caveats for if keys entered into url exist
#Need to add on cascade delete
       
