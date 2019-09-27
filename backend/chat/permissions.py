from rest_framework import permissions


class IsMemberOfChat(permissions.BasePermission):
    def has_object_permission(self, request, view, chat):
        if request.user:
            print(chat.members.all())
            return request.user in chat.members.all()
        return False

class IsAuthorOfChatMessage(permissions.BasePermission):
    def has_object_permission(self, request, view, chat_message):
        if request.user:
            return chat_message.author == request.user
        return False