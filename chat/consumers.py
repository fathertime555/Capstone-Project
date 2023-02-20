# similar to views.
import json
from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from chat.models import Message


class TextRoomConsumer(AsyncWebsocketConsumer):
    @database_sync_to_async
    def create_chat (self, msg, sender):
        return Message.objects.create(sender = sender, msg = msg)

    async def connect (self):
        self.room_name = self.scope ['url_route'] ['kwargs'] ['room_name']
        self.room_group_name = 'chat_%s' % self.room_name
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect (self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json ['message']
        sender = text_data_json ['sender']
        await self.channel_layer.group_send(self.room_group_name, {
            'type'   : 'chat_message',
            'message': message,
            'sender' : sender
        })

    async def chat_message (self, event):
        message = event ['message']
        sender = event ['sender']
        new_msg = await self.create_chat(sender, message)  # It is necessary to await creation of messages
        await self.send(text_data = json.dumps({
            'message': new_msg.message,
            'sender' : new_msg.sender
        }))