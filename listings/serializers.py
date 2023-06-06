from rest_framework import serializers
from listings.models import Listing, Item, FavoriteListings, FavoriteItems


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