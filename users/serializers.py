from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from users.models import AppUser

UserModel = get_user_model()

class CreateUserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)
    class Meta:
        model = AppUser
        fields = ('id', 'username', 'password', 'email', 'first_name', 'last_name')
        write_only_fields = ('password',)
        read_only_fields = ('id',)
        extra_kwargs = {"password": {"write_only": True}}


    def create (self, validated_data):
        user = AppUser.objects.create(
            username = validated_data ['username'],
            email = validated_data ['email'],
            first_name = validated_data ['first_name'],
            last_name = validated_data ['last_name'],
            token = Token.objects.create()
        )

        user.set_password(validated_data ['password'])
        user.save()

        return user




    # def save(self):
    #     account = AppUser(email=self.validated_data["email"],
    #                       username = self.validated_data["username"]
    #                       )
    #     password = self.validated_data["password"]
    #     password2 = self.validated_data["password2"]
    #
    #     if password != password2:
    #         raise serializers.ValidationError({"password:": "Password must match"})
    #     account.set_password(password)
    #     account.save()
    #     return account