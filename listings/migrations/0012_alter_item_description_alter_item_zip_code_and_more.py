# Generated by Django 4.1.3 on 2023-03-01 03:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('listings', '0011_alter_item_owner_alter_listing_owner'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='item',
            name='zip_code',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='listing',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='listing',
            name='theme',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='listing',
            name='zip_code',
            field=models.IntegerField(),
        ),
    ]