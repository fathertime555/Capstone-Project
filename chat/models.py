from django.db import models
from users.models import AppUser

class UserProfileModel(models.Model):
    user = models.OneToOneField(to=AppUser, on_delete=models.CASCADE)
    name = models.CharField(blank=True, null=True, max_length=100)
    online_status = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.user.username

# used to structure a single message
class ChatMessage(models.Model):
    sender = models.ForeignKey(to=AppUser, on_delete=models.CASCADE)
    message = models.TextField(null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.message
# Used to structure a chat thread
class ChatModel(models.Model):
    sender = models.ForeignKey(to=AppUser, on_delete=models.CASCADE)
    message = models.TextField(null=True, blank=True)
    thread_name = models.CharField(null=True, blank=True, max_length=50)
    timestamp = models.DateTimeField(auto_now_add=True)
    participants = models.ManyToManyField(to=AppUser, related_name='chats', blank=True)
    messages = models.ManyToManyField(to=ChatMessage, related_name='chat', blank=True)

    def __str__(self) -> str:
        return self.message

class ChatNotification(models.Model):
    chat = models.ForeignKey(to=ChatModel, on_delete=models.CASCADE)
    user = models.ForeignKey(to=AppUser, on_delete=models.CASCADE)
    is_seen = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.user.username