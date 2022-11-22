from django.contrib import admin
from django.urls import include,path

from . import views

urlpatterns = [
    path('', views.index),
    path('login/', views.login),
    path('additem/',views.form),
    path('userpage/',views.user),
    path('signup/',views.signup),
    path('item/',views.itempage),
    path('newmap/',views.newmap)
]
