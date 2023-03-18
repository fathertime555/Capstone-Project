from django.contrib.auth.models import User
from .models import AppUser
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework import permissions, status, viewsets, mixins, generics
from django.contrib import auth
from rest_framework.response import Response
from .serializers import MainUserSerializer, UserRegistrationSerializer, LoginSerializer
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator
from rest_framework import permissions
from rest_framework.parsers import MultiPartParser, FormParser
from SpiffoList.axios import Axios_response


class CheckAuthenticatedView(APIView):
    def get(self, request, format=None):
        user = self.request.user
        try:
            isAuthenticated = user.is_authenticated

            if isAuthenticated:
                return Response({'isAuthenticated': 'success'})
            else:
                return Response({'isAuthenticated': 'error'})
        except:
            return Response({'error': 'Something went wrong when checking authentication status'})


@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class UserSearch(viewsets.ViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin, generics.GenericAPIView):
    permission_classes = (permissions.BasePermission,)
    serializer_class = MainUserSerializer

    def list(self, request, *args, **kwargs):
        queryset = AppUser.objects.all()

        #user_data = get_object_or_404(queryset)
        serializer = MainUserSerializer()
        users = queryset.values_list('username', flat=True)
        return Response(users)

    def retrieve(self, request, username=None):
        queryset = AppUser.objects.filter(username=username)
        user = queryset.values_list("id", flat=True)
        #serializer = MainUserSerializer(user)
        return Response(user)


@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class UserViewSet(viewsets.ViewSet, mixins.ListModelMixin, mixins.UpdateModelMixin, generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = MainUserSerializer
    parser_classes = (MultiPartParser, FormParser)
    queryset = AppUser.objects.all()

    def delete(self, request, format=None):
        user = self.request.user
        try:
            isAuthenticated = user.is_authenticated
            if isAuthenticated:
                User.objects.filter(id=user.id).delete()
            else:
                return Response({'isAuthenticated': 'error'})
            return Response({'success': 'User deleted successfully'})
        except:
            return Response({'error': 'Something went wrong when trying to delete user'})

    # pk is what is passed into the url
    def retrieve(self, request, pk=None):
        user = self.request.user
        try:
            if int(user.id) != int(pk):
                print("PK = ", pk)
                print("User ID = ", user.id)
                return Response({"incorrect id"})

            isAuthenticated = user.is_authenticated

            if isAuthenticated:
                queryset = AppUser.objects.filter(id=user.id)
                user_data = get_object_or_404(queryset, pk=user.id)
                serializer = MainUserSerializer(user_data)
                return Response(serializer.data)
            else:
                return Response({'isAuthenticated': 'error'})
        except:
            return Response({'error': 'Something went wrong when checking authentication status'})

    def update(self, request, *args, **kwargs):
        # queryset = AppUser.objects.all()
        # data = self.request.data
        user = self.request.user
        expected_user = AppUser.objects.get(pk=self.kwargs["pk"])
        # print(expected_user)
        # print(self.request.user.pk)
        # print(self.kwargs["pk"])
        # print(data)
        if user.pk == expected_user.id:
            serializer = self.serializer_class(
                request.user, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'profile not updated'})


@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class LoginView(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny, )
    serializer_class = LoginSerializer

    def post(self, request, format=None):
        data = self.request.data
        username = data['username']
        password = data['password']
        try:
            user = auth.authenticate(
                request, username=username, password=password)
            if user is not None:
                auth.login(request, user)
                # queryset = AppUser.objects.filter(id = user.id)
                # user_data = get_object_or_404(queryset, pk = user.id)
                # serializer = MainUserSerializer(user_data)
                # return Response(res.Success(message='login success',serializersdata=MainUserSerializer(user)))
                return Axios_response.ResponseSuccess(message='login success', serializersdata=MainUserSerializer(user))

            else:
                return Response(Axios_response.Failed('Error Authenticating'))

        except:
            return Response(Axios_response.Failed('Something went wrong when logging in'))


@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class LogoutView(generics.GenericAPIView):
    serializer_class = MainUserSerializer

    def post(self, request, format=None):
        try:
            auth.logout(request)
            return Axios_response.ResponseSuccess(message='Loggout Out')
        except:
            return Axios_response.ResponseFailed('Something went wrong when logging out')


@method_decorator(ensure_csrf_cookie, name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class UserRegistration(viewsets.ViewSet, generics.GenericAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = UserRegistrationSerializer
    parser_classes = (MultiPartParser, FormParser)

    def create(self, request, format=None):
        data = self.request.data

        username = data['username']
        password = data['password']
        re_password = data['re_password']

        try:
            if password == re_password:
                if AppUser.objects.filter(username=username).exists():
                    return Response({'error': 'Username already exists'})
                else:
                    if len(password) < 6:
                        return Response({'error': 'Password must be at least 6 characters'})
                    else:
                        user = AppUser.objects.create_user(
                            username=username, password=password)
                        serializer = MainUserSerializer(
                            AppUser.objects.get(id=user.id))
                        return Response(serializer.data)
            else:
                return Response({'error': 'Passwords do not match'})
        except:
            return Response({'error': 'Something went wrong when registering account'})
