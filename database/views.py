
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.core.files.storage import FileSystemStorage
from django.views.decorators.csrf import csrf_exempt
from django.core.serializers import serialize
from django.db import connection
from django.http import JsonResponse
import base64
from django.core.files.base import ContentFile
import base64



def dictfetchall(cursor):
    "Return all rows from a cursor as a dict"
    columns = [col[0] for col in cursor.description]
    return [
        dict(zip(columns, row))
        for row in cursor.fetchall()
    ]


def data(request):
    cursor = connection.cursor()
    cursor.callproc('getitemlist')
    data = dictfetchall(cursor)
    cursor.close()
    return JsonResponse(data, safe=False)

def getitemlistbygsid(request):
    cursor = connection.cursor()
    cursor.callproc('getitemlistbygsid',request.GET.get('gsid'))
    data = dictfetchall(cursor)
    cursor.close()
    return JsonResponse(data, safe=False)

def getgaragesale(request):
    cursor = connection.cursor()
    cursor.callproc('getgaragesale')
    data = dictfetchall(cursor)
    cursor.close()
    return JsonResponse(data, safe=False)


def createitem(request):
    param = (request.GET.get('itemname'),
             request.GET.get('brand'),
             request.GET.get('mnumber'),
             request.GET.get('description'),
             request.GET.get('price'),
             request.GET.get('qty'),
             request.GET.get('gsid'),
             request.GET.get('imageid'),
             request.GET.get('uid'),
             request.GET.get('display'),
             0)

    cursor = connection.cursor()
    cursor.callproc('additem', param)
    r = cursor.fetchall()
    cursor.close()
    return JsonResponse(r, safe=False)


def changedisplay(request):
    param = (request.GET.get('itid'),
             request.GET.get('display'),
             0)
    print(param)
    cursor = connection.cursor()
    cursor.callproc('updatedisplay', param)
    cursor.close()
    return JsonResponse({"result": 1}, safe=False)


def newgaragesale(request):
    param=(
        request.GET.get('street'),
        request.GET.get('city'),
        request.GET.get('states'),
        request.GET.get('zip'),
        request.GET.get('start'),
        request.GET.get('end'),
        request.GET.get('uid'),
        request.GET.get('description'),
    )
    cursor = connection.cursor()
    cursor.callproc('newgaragesale', param)
    r = cursor.fetchall()
    cursor.close()
    return JsonResponse(r, safe=False)

def getitem(request):
    cursor = connection.cursor()
    cursor.callproc('getitem', [request.GET.get('itid')])
    data=dictfetchall(cursor)
    cursor.close()
    cursor = connection.cursor()
    cursor.callproc('getitemimage', [request.GET.get('itid')])
    image=dictfetchall(cursor)
    cursor.close()
    return JsonResponse({'item':data,'image':image}, safe=False)


@csrf_exempt
def image_request(request):
    if request.method == 'POST':
        data = request.POST.get('FILES')
        itid = request.POST.get('itid')
        imgnum = request.POST.get('num')
        # file=file.replace('data:image/png;base64,','')
        print(data)

        format, imgstr = data.split(';base64,')  # format ~= data:image/X,
        ext = format.split('/')[-1]  # guess file extension
        data = ContentFile(base64.b64decode(imgstr), 'a.' + ext)

        address = 'static/src/'+itid+'_'+imgnum+'.'+ext

        newimage = open(address, 'wb')
        newimage.write(base64.b64decode(imgstr))
        newimage.close()

        main=0
        if(imgnum=='1'):
            main=1

        param = (itid,
                 address,
                 main)
        cursor = connection.cursor()
        cursor.callproc('addimage', param)
        cursor.close()
        # data = base64.b64decode(file.encode('UTF-8'))
        # buf = io.BytesIO(data)
        # img = Image.open(buf)

    return JsonResponse({"result": 1}, safe=False)
