from django.urls import path

from . import views

urlpatterns = [
    path('data/',views.data,name='data'),
    path('changedisplay/',views.changedisplay,name='changedisplay'),
    path('createitem/',views.createitem,name='createitem'),
    #path('upload_file/',views.upload_file,name='upload_file'),
    path('image_request/',views.image_request,name='image_request'),
    path('getitem/',views.getitem,name='getitem'),
    path('newgaragesale/',views.newgaragesale,name='newgaragesale'),
    path('getgaragesale/',views.getgaragesale,name='getgaragesale'),
    path('getitemlistbygsid/',views.getitemlistbygsid,name='getitemlistbygsid'),
    
]