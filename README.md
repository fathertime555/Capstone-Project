# Capstone-Project

please install mysql and 
install mysqlclient by: pip install mysqlclient
change setting.py

'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME':'test4',
        'USER':'root',
        'PASSWORD':'20160402dD!',
        'HOST':'127.0.0.1',
        'PORT':'3306',
    }

to your connection param.

run usertable_create.sql to create test table.
then run all the other sql script in the sql folder to add stored procedure to your test database.