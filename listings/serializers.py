from rest_framework import serializers
from listings.models import Listing, Item


class ListingSerializerPost(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = "__all__"

class ListingSerializerGet(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = [
            'title',
            'listing_main_photo',
            'description',
            'location',
            'lat',
            'lng'
        ]


class ItemSerializerPost(serializers.ModelSerializer):
   class Meta:
        model = Item
        fields = "__all__"

class ItemSerializerGet(serializers.ModelSerializer):
   class Meta:
        model = Item
        fields = [
            'name',
            'item_main_photo',
            'description',
            'quantity', 
            'price'
        ]