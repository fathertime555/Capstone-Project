import MySQLdb
from asgiref.sync import sync_to_async
from django.http import HttpResponse
from django.db import models
from . import module

db=MySQLdb.connect(host="localhost",user="root",password="20160402dD!",database="test")

def getdata(request):

    # db.query("""select*from itemtable""")
    # result=db.use_result()
    # data=result.fetch_row(0,1)
    # print(data[0])
    # items=data[0]
    # print(items)
    # print(data)

    data=module.Itemtable.objects.all()

    return HttpResponse(data)
    
