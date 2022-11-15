from django.shortcuts import render
from django.http import HttpResponse
from . import models

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

def data(request):
    return HttpResponse(models.Itemtable.objects.all())

