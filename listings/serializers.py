from rest_framework import serializers
from listings.models import Listing, Item, FavoriteListings, FavoriteItems

#Serializers are used to ensure that the data being passed to the backend from the frontend is of a form that 
#can be successfully saved in whatever database it is being told to save it in. Basically standardizes the data in JSON-type form.

class ListingSerializerPost(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = "__all__"

class ListingSerializerGet(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = [
            'pk',
            'title',
            'listing_main_photo',
            'description',
            'location',
            'theme',
            'start_time',
            'end_time'
        ]


class ItemSerializerPost(serializers.ModelSerializer):
   class Meta:
        model = Item
        fields = "__all__"

class ItemSerializerGet(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = [
            'pk',
            'name',
            'item_main_photo',
            'description',
            'quantity', 
            'price',
            'tags'
        ]

class FavoriteListSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteListings
        fields = [
            "user",
            "listing"
        ]

class FavoriteItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteItems
        fields = [
            "user",
            "item"
        ]