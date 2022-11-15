from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request,'index.html')

def itempage(request):
    return render(request,'item.html')

def login(request):
    return render(request,'login.html')

def signup(request):
    return render(request,'singup.html')

def map(request):
    return render(request,'map.html')

def user(request):
    return render(request,'userpage.html')
