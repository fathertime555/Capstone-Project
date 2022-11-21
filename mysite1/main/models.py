from django.db import models
from datetime import date

# Create your models here.
class ToDoList(models.Model):
	name = models.CharField(max_length=200)

	def __str__(self):
		return self.name

class Item(models.Model):
	todolist = models.ForeignKey(ToDoList, on_delete=models.CASCADE)
	text = models.CharField(max_length=300)
	complete = models.BooleanField()

	def __str__(self):
		return self.text

class Listing(models.Model):
	lsname = models.CharField(max_length=100)
	address = models.CharField(max_length=50)
	phoneno = models.CharField(max_length=12)
	description = models.CharField(max_length=500)
	
	def __str__(self):
		return self.lsname

class Event(models.Model):
	name = models.CharField('Event Name', max_length=100)
	event_date = models.DateTimeField('Event Date')
	venue = models.CharField(max_length=120)
	#user
	description = models.TextField(blank=True)

	def __str__(self):
		return self.name