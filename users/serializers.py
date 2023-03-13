from rest_framework import serializers
from .models import AppUser


class MainUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUser
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "address_line_1",
            "address_line_2",
            "city",
            "state",
            "zip_code",
            "phone_number",
            'image_url'
        ]

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUser
        fields = [
            "username",
            "password",

        ]


# User for only registration
class UserRegistrationSerializer(serializers.ModelSerializer):
    # write only since we are not saving it to the database
    re_password = serializers.CharField(allow_blank = False, write_only = True)
    email = serializers.EmailField(allow_blank = False)
    # first_name = serializers.CharField(allow_blank = True)
    # last_name = serializers.CharField(allow_blank = True)
    class Meta:
        model = AppUser
        fields = [
            "username",
            "first_name",
            "last_name",
            "email",
            "password",
            "re_password",
            'image_url'
        ]