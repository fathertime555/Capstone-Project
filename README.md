# Capstone-Project
<div>
please install mysql and install mysqlclient by: 
</div>
<div>
pip install mysqlclient
</div>

<div>
<p></p>

<p>change setting.py</p>

<div>
<p>DATABASES = {</p>
<p>    'default': {</p>
<p>        'ENGINE': 'django.db.backends.mysql',</p>
<p>        'NAME':'test4',</p>
<p>        'USER':'root',</p>
<p>        'PASSWORD':'20160402dD!',</p>
<p>        'HOST':'127.0.0.1',</p>
<p>        'PORT':'3306',</p>
<p>    }</p>
<p>}</p>
</div>
to your connection param.
</div>


run database_create.sql to create test table.
then run all the other sql script in the sql folder to add stored procedure to your test database.