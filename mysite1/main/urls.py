from django.urls import path
from . import views

urlpatterns = [
path("<int:id>", views.index, name="index"),
path("", views.home, name="home"),
path("create/", views.create, name="create"),


path("lshome/", views.lshome, name="lshome"),
path("lscreation/", views.lscreation, name="lscreation"),
path("itemaddition/", views.itemaddition, name="itemaddition"),
path("saleaddy/", views.saleaddy, name="saleaddy"),

path("addevent/", views.addevent, name="addevent"),

]