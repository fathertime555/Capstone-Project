# Generated by Django 4.1.6 on 2023-02-19 01:05

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('listings', '0008_listing_lat_listing_lng'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='date',
            field=models.DateTimeField(default=datetime.date.today),
        ),
        migrations.AddField(
            model_name='item',
            name='lat',
            field=models.CharField(default='0', max_length=20),
        ),
        migrations.AddField(
            model_name='item',
            name='lng',
            field=models.CharField(default='0', max_length=20),
        ),
        migrations.AddField(
            model_name='item',
            name='tags',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='item',
            name='zip_code',
            field=models.CharField(default='000000', max_length=20),
        ),
        migrations.AddField(
            model_name='listing',
            name='date',
            field=models.DateTimeField(default=datetime.date.today),
        ),
        migrations.AddField(
            model_name='listing',
            name='theme',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='listing',
            name='zip_code',
            field=models.CharField(default='000000', max_length=20),
        ),
        migrations.AlterField(
            model_name='listing',
            name='lat',
            field=models.CharField(default='0', max_length=20),
        ),
        migrations.AlterField(
            model_name='listing',
            name='lng',
            field=models.CharField(default='0', max_length=20),
        ),
    ]
