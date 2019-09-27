from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

from authentication.serializers import AccountSerializer
from chat.models import Chat, ChatMessage


class ChatMessageSerializer(serializers.ModelSerializer):
    author = AccountSerializer(read_only=True, required=False)

    class Meta:
        model = ChatMessage
        fields = ('id', 'author', 'chat', 'created_at', 'content', 'checked')
        read_only_fields = ('id', 'author', 'created_at')

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(ChatMessageSerializer, self).get_validation_exclusions()
        return exclusions + ['author']


class ChatSerializer(serializers.ModelSerializer):
    members = AccountSerializer(many=True, read_only=True, required=False)
    messages = serializers.PrimaryKeyRelatedField(many=True, read_only=True, allow_null=True)

    class Meta:
        model = Chat
        fields = ('id', 'members', 'created_at', 'updated_at', 'messages')
        read_only_fields = ('id', 'created_at', 'updated_at', 'messages')

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(ChatSerializer, self).get_validation_exclusions()
        return exclusions

