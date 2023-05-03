# chat/consumers.py
import json
from asgiref.sync import async_to_sync, sync_to_async
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model
from chat.models import ChatMessage, ChatModel, UserProfileModel
from users.models import AppUser


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):

        # Extracts the ID of the current user from self.scope['user'].id
        # if it exists, otherwise from self.scope['query_string'].
        current_user_id = self.scope['user'].id if self.scope['user'].id else int(self.scope['query_string'])

        # Extracts the ID of the other user from self.scope['url_route']['kwargs']['id'],
        # assuming it's passed as a keyword argument in the URL routing.
        other_user_id = self.scope['url_route']['kwargs']['id']

        # Constructs a unique room name by combining the IDs of the current user and the other user,
        # sorted in ascending order to ensure consistency.
        self.room_name = (
            f'{current_user_id}-{other_user_id}'
            if int(current_user_id) > int(other_user_id)
            else f'{other_user_id}-{current_user_id}'
        )
        # for testing
        print(self.room_name)

        # Constructs a group name for the chat room by appending the chat_ prefix to the self.room_name.
        self.room_group_name = f'chat_{self.room_name}'

        # Adds the current channel (websocket) to the group associated
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)

        # Accepts the websocket
        await self.accept()

        # Sends the self.room_group_name as text data to the connected client.
        await self.send(text_data=self.room_group_name)

        # Fetch chat history and send to the connected client
        chat_model = ChatModel.objects.get(thread_name=self.room_group_name)
        messages = chat_model.messages.all()
        for message in messages:
            await self.send(text_data=json.dumps({"message": message.message, "sender": message.sender_id}))

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_layer)
        await self.disconnect(close_code)

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        current_user_id = self.scope['user'].id

        # Create a new ChatMessage object and save it to the database
        chat_message = ChatMessage(sender_id=current_user_id, message=message)
        chat_message.save()

        # Get or create the ChatModel object for the chat thread
        chat_model, created = ChatModel.objects.get_or_create(
            thread_name=self.room_group_name
        )
        # Add the ChatMessage to the ChatModel's messages ManyToManyField
        chat_model.messages.add(chat_message)
        chat_model.save()

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name, {"type": "chat_message", "message": message, "sender": current_user_id}
        )

    async def chat_message(self, event):
        message = event["message"]
        sender = event["sender"]

        # Send message and sender to WebSocket
        await self.send(text_data=json.dumps({"message": message, "sender": sender}))



class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        my_id = self.scope['user'].id  # Extracts the ID of the current user from `self.scope['user'].id`
        self.room_group_name = f'{my_id}'  # Constructs a group name using the current user's ID
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )  # Adds the current channel (websocket) to the group associated with the `self.room_group_name`,
           # allowing it to receive messages sent to that group
        await self.accept()  # Accepts the websocket connection

    async def disconnect(self, code):
        self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )  # Removes the current channel (websocket) from the group associated with the `self.room_group_name`,
           # preventing it from receiving further messages sent to that group

    async def send_notification(self, event):
        data = json.loads(event.get('value'))  # Extracts the value from the event dictionary and loads it as JSON
        count = data['count']  # Extracts the 'count' value from the data
        print(count)  # Prints the count to the console

        # Send the notification count to WebSocket
        await self.send(text_data=json.dumps({
            'count': count
        }))  # Sends the 'count' value as JSON text data to the connected client over the websocket



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