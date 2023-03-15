# chat/consumers.py
import json
from asgiref.sync import async_to_sync, sync_to_async
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model
from chat.models import UserProfileModel
from users.models import AppUser


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        current_user_id = self.scope['user'].id if self.scope['user'].id else int(self.scope['query_string'])
        other_user_id = self.scope['url_route']['kwargs']['id']
        self.room_name = (
            f'{current_user_id}-{other_user_id}'
            if int(current_user_id) > int(other_user_id)
            else f'{other_user_id}-{current_user_id}'
        )
        print(self.room_name)
        self.room_group_name = f'chat_{self.room_name}'
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()
        await self.send(text_data=self.room_group_name)

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_layer)
        await self.disconnect(close_code)

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name, {"type": "chat_message", "message": message}
        )

    async def chat_message(self, event):
        message = event["message"]

        # Send message to WebSocket
        await self.send(text_data=json.dumps({"message": message}))


class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect (self):
        my_id = self.scope ['user'].id
        self.room_group_name = f'{my_id}'
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect (self, code):
        self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )


    async def send_notification (self, event):
        data = json.loads(event.get('value'))
        count = data ['count']
        print(count)
        await self.send(text_data = json.dumps({
            'count': count
        }))


class OnlineStatusConsumer(AsyncWebsocketConsumer):
    async def connect (self):
        self.room_group_name = 'user'
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def receive (self, text_data=None, bytes_data=None):
        data = json.loads(text_data)
        username = data ['username']
        connection_type = data ['type']
        print(connection_type)
        await self.change_online_status(username, connection_type)

    async def send_onlineStatus (self, event):
        data = json.loads(event.get('value'))
        username = data ['username']
        online_status = data ['status']
        await self.send(text_data = json.dumps({
            'username'     : username,
            'online_status': online_status
        }))

    async def disconnect (self, message):
        self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    @database_sync_to_async
    def change_online_status (self, username, c_type):
        user = AppUser.objects.get(username = username)
        userprofile = UserProfileModel.objects.get(user = user)
        if c_type == 'open':
            userprofile.online_status = True
            userprofile.save()
        else:
            userprofile.online_status = False
            userprofile.save()