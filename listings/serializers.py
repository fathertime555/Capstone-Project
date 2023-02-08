from rest_framework import serializers
from listings.models import Listing, Item


class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = [
            'pk',
            'title',
            'listing_main_photo',
            'description',
            'location'
        ]

class ItemSerializer(serializers.ModelSerializer):
   class Meta:
        model = Item
        fields = [
            'pk',
            'name',
            'item_main_photo',
            'description',
            'quantity', 
            'price'
        ]
