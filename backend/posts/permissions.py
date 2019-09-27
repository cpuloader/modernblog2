from rest_framework import permissions


class IsAuthorOfPost(permissions.BasePermission):
    def has_object_permission(self, request, view, post):
        if request.user:
            return post.author == request.user
        return False

class IsAuthorOfComment(permissions.BasePermission):
    def has_object_permission(self, request, view, comment):
        #print('checking perms for comment', comment)
        #if request.user:
        #    return comment.author == request.user
        #return False
        return True

class IsAuthorOfImage(permissions.BasePermission):
    def has_object_permission(self, request, view, image):
        #print('checking perms for image', image)
        if request.user:
            return image.author == request.user
        return False