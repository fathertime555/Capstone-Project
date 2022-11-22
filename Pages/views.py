from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

def index(request):
    return render(request,'index.html')
@csrf_exempt
def itempage(request):
    print(request)
    return render(request,'item.html')

def login(request):
    return render(request,'login.html')

def signup(request):
    return render(request,'singup.html')

def map(request):
    return render(request,'map.html')

def user(request):
    return render(request,'userpage.html')

def form(request):
    return render(request,'form.html')

def newmap(request):
    return render(request,'newmap.html')

