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
            'pk',
            'title',
            'listing_main_photo',
            'listing_photo_url',
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
            'item_photo_url',
            'description',
            'quantity', 
            'price',
            'tags'
        ]