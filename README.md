# Capstone-Project
<div>
please install mysql and install mysqlclient by: 
</div>
<div>
pip install mysqlclient
</div>

<div>
<p>change setting.py</p>

<div>
DATABASES = {
    # "default": {
    #     "ENGINE": "django.db.backends.sqlite3",
    #     "NAME": BASE_DIR / "db.sqlite3",
    # }
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME':'test4',
        'USER':'root',
        'PASSWORD':'20160402dD!',
        'HOST':'127.0.0.1',
        'PORT':'3306',
    }
}
</div>

to your connection param.
</div>


run usertable_create.sql to create test table.
then run all the other sql script in the sql folder to add stored procedure to your test database.