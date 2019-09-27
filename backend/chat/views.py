import datetime

from django.utils import timezone
from django.db.models import Count, Q, Max
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import permissions, viewsets, status
from rest_framework.response import Response
from rest_framework import serializers
from django.core.paginator import Paginator

from authentication.models import Account
from chat.models import Chat, ChatMessage
from chat.permissions import IsMemberOfChat, IsAuthorOfChatMessage
from chat.serializers import ChatMessageSerializer, ChatSerializer
from chat.utils import send_notification_email

from django.conf import settings
if settings.DEBUG:
    import time, random                         # for debug

class MessagesViewSet(viewsets.ModelViewSet):
    queryset = ChatMessage.objects.order_by('-created_at')
    serializer_class = ChatMessageSerializer

    def paginate_queryset(self, queryset, view=None): # turn off pagination
        return None

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.IsAuthenticated(),)   #AllowAny()
        return (permissions.IsAuthenticated(),)    #IsAuthorOfChatMessage(),

    def perform_create(self, serializer):
        if settings.DEBUG:
            time.sleep(random.random()*2)          # for debug
        instance = serializer.save(author=self.request.user)
        chat = Chat.objects.get(id = instance.chat.id)
        receivers = []
        for receiver in chat.members.all():
            if not receiver.is_online():
                receivers.append(receiver.email)
        if len(receivers):
            send_notification_email(receivers, instance)
        return super(MessagesViewSet, self).perform_create(serializer)



class ChatsViewSet(viewsets.ModelViewSet):
    queryset = Chat.objects.order_by('-updated_at')
    serializer_class = ChatSerializer

    def paginate_queryset(self, queryset, view=None): # turn off pagination
        return None

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)
        return (permissions.IsAuthenticated(), IsMemberOfChat(),)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        if len(self.request.data['members']) == 2:
            user1 = self.request.data['members'][0]['username']
            user2 = self.request.data['members'][1]['username']
            try:                  # trying to find chat with only two exact users
                instance = list(Chat.objects.annotate(members_count=Count('members')) \
                          .filter(members_count=2).filter(members__username=user1) \
                          .filter(members__username=user2))
                if len(instance) == 1:  # found one
                    serializer = self.get_serializer(instance[0])
                    return Response(serializer.data)
                else:
                    raise(ObjectDoesNotExist)

            except ObjectDoesNotExist:      # if didn't find, create new chat
                member1_pk = user2 = self.request.data['members'][0]['id']
                member2_pk = user2 = self.request.data['members'][1]['id']
                new_chat = Chat.objects.create()
                new_chat.members = [member1_pk, member2_pk]
                serializer = self.get_serializer(new_chat)
                headers = self.get_success_headers(serializer.data)
                return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        else:
            self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.members.count() > 1:
            instance.members.remove(self.request.user)
            instance.save()
        else:
            self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


class ChatMessagesViewSet(viewsets.ModelViewSet):
    queryset = ChatMessage.objects.select_related('chat').order_by('created_at')
    serializer_class = ChatMessageSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.IsAuthenticated(),)
        return (permissions.IsAuthenticated(), IsAuthorOfChatMessage(),)
    
    def paginate_queryset(self, queryset, view=None): # turn off pagination
        return None

    def list(self, request, *args, **kwargs):
        if self.request.GET.get('unread'):
            author = self.request.user.username
            queryset = ChatMessage.objects.filter(chat=self.kwargs['chat_pk'], checked=False).exclude(author__username=author)
        else:
            queryset = ChatMessage.objects.filter(chat=self.kwargs['chat_pk'])
        serializer = self.get_serializer(queryset, many=True)
        if settings.DEBUG:
            time.sleep(random.random()*2)        # for debug
        return Response(serializer.data)


class AccountChatsViewSet(viewsets.ModelViewSet):
    queryset = Chat.objects.order_by('-updated_at')
    serializer_class = ChatSerializer
    
    def paginate_queryset(self, queryset, view=None): # turn off pagination
        return None

    def get_queryset(self):
        queryset = self.queryset.filter(members__username=self.kwargs['account_username'])
        return queryset

class ObserverViewSet(viewsets.ModelViewSet):
    queryset = ChatMessage.objects.all()
    serializer_class = ChatMessageSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.IsAuthenticated(),) #AllowAny()
        return (permissions.IsAuthenticated(),)

    def list(self, request):
        author = self.request.user.username
        queryset = ChatMessage.objects.filter(chat__members__username=author, checked=False).exclude(author__username=author)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)