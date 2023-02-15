from django.contrib.auth.models import User
from .models import AppUser
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework import permissions, viewsets, mixins,generics
from django.contrib import auth
from rest_framework.response import Response
from .serializers import MainUserSerializer, UserRegistrationSerializer
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator


class CheckAuthenticatedView(APIView):
    def get(self, request, format=None):
        user = self.request.user
        try:
            isAuthenticated = user.is_authenticated

            if isAuthenticated:
                return Response({ 'isAuthenticated': 'success' })
            else:
                return Response({ 'isAuthenticated': 'error' })
        except:
            return Response({ 'error': 'Something went wrong when checking authentication status' })


@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class UserViewSet(viewsets.ViewSet, mixins.ListModelMixin, mixins.UpdateModelMixin,generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = MainUserSerializer
    def delete(self, request, format=None):
        user = self.request.user
        try:
            isAuthenticated = user.is_authenticated
            if isAuthenticated:
                User.objects.filter(id=user.id).delete()
            else:
                return Response({'isAuthenticated': 'error'})
            return Response({ 'success': 'User deleted successfully' })
        except:
            return Response({ 'error': 'Something went wrong when trying to delete user' })

    # pk is what is passed into the url
    def retrieve(self,request,pk=None):
        user = self.request.user
        try:
            if int(user.id) != int(pk):
                print("PK = ", pk)
                print("User ID = ", user.id)
                return Response({"incorrect id"})

            isAuthenticated = user.is_authenticated

            if isAuthenticated:
                queryset = AppUser.objects.filter(id = user.id)
                user_data = get_object_or_404(queryset, pk = user.id)
                serializer = MainUserSerializer(user_data)
                return Response(serializer.data)
            else:
                return Response({'isAuthenticated': 'error'})
        except:
            return Response({'error': 'Something went wrong when checking authentication status'})

    def list (self, *args, **kwargs):
        user = self.request.user
        try:
            isAuthenticated = user.is_authenticated
            if isAuthenticated:
                User.objects.filter(id = user.id)
            else:
                return Response({'isAuthenticated': 'error'})
        except:
            return Response({"Doomed"})

    def update(self, request, *args, **kwargs):

        user = self.request.user
        data = self.request.data
        print(data)
        username = data["username"]
        first_name = data ['first_name']
        last_name = data ['last_name']
        email = data["email"]
        address_line_1 = data["address_line_1"]
        address_line_2 = data["address_line_2"]
        city = data ['city']
        state = data["state"]
        zip_code = data["zip_code"]
        phone_number = data ['phone_number']

        AppUser.objects.filter(id = user.id).update(username = username, first_name = first_name,
                                                 last_name = last_name,email = email, phone_number = phone_number,
                                                 address_line_1 = address_line_1, address_line_2 = address_line_2,
                                                 city = city, state= state, zip_code = zip_code)
        return Response({'profile updated'})


@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class LoginView(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny, )
    serializer_class = MainUserSerializer
    def post(self, request, format=None):
        data = self.request.data
        username = data['username']
        password = data['password']
        try:
            user = auth.authenticate(username=username, password=password)
            if user is not None:
                auth.login(request, user)
                return Response({ 'success': 'User authenticated' })
            else:
                return Response({ 'error': 'Error Authenticating' })
        except:
            return Response({ 'error': 'Something went wrong when logging in' })

@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class LogoutView(generics.GenericAPIView):
    # serializer_class = MainUserSerializer
    def post(self, request, format=None):
        try:
            auth.logout(request)
            return Response({ 'success': 'Loggout Out' })
        except:
            return Response({ 'error': 'Something went wrong when logging out' })

@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class UserRegistration(viewsets.ViewSet,generics.GenericAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = UserRegistrationSerializer
    def create (self, request, format=None):
        data = self.request.data

        username = data['username']
        password = data['password']
        re_password  = data['re_password']

        try:
            if password == re_password:
                if AppUser.objects.filter(username=username).exists():
                    return Response({ 'error': 'Username already exists' })
                else:
                    if len(password) < 6:
                        return Response({ 'error': 'Password must be at least 6 characters' })
                    else:
                        user = AppUser.objects.create_user(username=username, password=password)

                        AppUser.objects.get(id=user.id)
                        return Response({ 'success': 'User created successfully' })
            else:
                return Response({ 'error': 'Passwords do not match' })
        except:
            return Response({ 'error': 'Something went wrong when registering account' })
