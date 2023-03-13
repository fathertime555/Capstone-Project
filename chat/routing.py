from channels.routing import ProtocolTypeRouter,URLRouter
from django.urls import path
from .consumers import ChatConsumer
from channels.auth import AuthMiddlewareStack
import os
from django.core.asgi import get_asgi_application

from django.urls import path

from chat import consumers

websocket_urlpatterns = [
    path('ws/chat/<int:id>/', consumers.ChatConsumer.as_asgi()),
]