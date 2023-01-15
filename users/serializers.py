from .models import AppUser
from rest_framework import serializers
from django.contrib.auth import get_user_model
UserModel = get_user_model()

class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)

    def create(self, validated_data):

        user = AppUser.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
        )

        return user

    class Meta:
        model = AppUser
        # Tuple of serialized model fields (see link [2])
        fields = ("id", "username", "password", )

