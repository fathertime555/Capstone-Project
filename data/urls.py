from django.urls import path
from . import views

app_name = "data"
urlpatterns = [
    path('', views.ListBoth.as_view()),
    path('items/', views.ListItems.as_view()),
    path('listings/', views.ListListings.as_view())
]