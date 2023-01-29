from rest_framework import serializers
from .models import AppUser


class MainUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUser
        fields = "__all__"
