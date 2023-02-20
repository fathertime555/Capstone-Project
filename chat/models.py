from django.db import models
from django.contrib.auth.models import User
from users.models import AppUser
# Create your models here.
class Message(models.Model):
    author = models.ForeignKey(User, related_name='messages', on_delete=models.CASCADE)
    context = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)