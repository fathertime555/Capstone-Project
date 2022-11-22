# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Addresstable(models.Model):
    aid = models.AutoField(primary_key=True)
    street = models.CharField(max_length=255, blank=True, null=True)
    apt = models.CharField(max_length=45, blank=True, null=True)
    city = models.CharField(max_length=45, blank=True, null=True)
    states = models.CharField(max_length=45, blank=True, null=True)
    zip = models.CharField(max_length=45, blank=True, null=True)
    uid = models.IntegerField(blank=True, null=True)
    type = models.IntegerField(blank=True, null=True)
    lat = models.CharField(max_length=45, blank=True, null=True)
    lng = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        db_table = 'addresstable'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Garagesaletable(models.Model):
    gsid = models.AutoField(primary_key=True)
    uid = models.IntegerField(blank=True, null=True)
    lid = models.IntegerField(blank=True, null=True)
    starttime = models.DateTimeField(blank=True, null=True)
    endtime = models.DateTimeField(blank=True, null=True)
    aid = models.IntegerField(blank=True, null=True)
    field_description = models.TextField(db_column='_description', blank=True, null=True)  # Field renamed because it started with '_'.
    imageid = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'garagesaletable'


class Imagetable(models.Model):
    itid = models.AutoField(primary_key=True)
    iid = models.IntegerField(blank=True, null=True)
    src = models.CharField(max_length=255, blank=True, null=True)
    uid = models.IntegerField(blank=True, null=True)
    type = models.IntegerField(blank=True, null=True)
    main = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'imagetable'


class Itemlisttable(models.Model):
    ltid = models.AutoField(primary_key=True)
    lid = models.IntegerField(blank=True, null=True)
    uid = models.IntegerField(blank=True, null=True)
    itid = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'itemlisttable'


class Itemtable(models.Model):
    itid = models.AutoField(primary_key=True)
    itemname = models.CharField(max_length=45, blank=True, null=True)
    brand = models.CharField(max_length=45, blank=True, null=True)
    mnumber = models.CharField(max_length=45, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True)
    qty = models.IntegerField(blank=True, null=True)
    detail = models.JSONField(blank=True, null=True)
    gsid = models.IntegerField(blank=True, null=True)
    posttime = models.DateTimeField(blank=True, null=True)
    imageid = models.IntegerField(blank=True, null=True)
    uid = models.IntegerField(blank=True, null=True)
    display = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'itemtable'


class Ordertable(models.Model):
    oid = models.AutoField(primary_key=True)
    uid = models.IntegerField(blank=True, null=True)
    lid = models.IntegerField(blank=True, null=True)
    ordertime = models.DateTimeField(blank=True, null=True)
    total = models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True)
    tax = models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True)
    subtotal = models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True)
    billing = models.CharField(max_length=255, blank=True, null=True)
    shipping = models.CharField(max_length=255, blank=True, null=True)
    cid = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        db_table = 'ordertable'




class Usertable(models.Model):
    uid = models.AutoField(primary_key=True)
    firstname = models.CharField(max_length=45, blank=True, null=True)
    lastname = models.CharField(max_length=45, blank=True, null=True)
    email = models.CharField(unique=True, max_length=255, blank=True, null=True)
    phone = models.CharField(max_length=45, blank=True, null=True)
    password = models.CharField(max_length=45, blank=True, null=True)
    registertime = models.DateTimeField(blank=True, null=True)
    username = models.CharField(max_length=45, blank=True, null=True)
    profilepicture = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table = 'usertable'
