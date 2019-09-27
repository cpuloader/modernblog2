from rest_framework import permissions, viewsets, status
from django.shortcuts import get_object_or_404
from rest_framework.response import Response

from posts.models import Post, Comment, DataImage
from posts.permissions import IsAuthorOfPost, IsAuthorOfComment, IsAuthorOfImage
from posts.serializers import PostSerializer, CommentSerializer, DataImageSerializer


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.order_by('-created_at')
    serializer_class = PostSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)
        return (permissions.IsAuthenticated(), IsAuthorOfPost(),)

    def perform_create(self, serializer):
        instance = serializer.save(author=self.request.user)

    def list(self, request, *args, **kwargs):
        queryset = self.queryset.exclude(draft=True)
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class CommentsViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.order_by('-created_at')#.select_related('parent_post')
    serializer_class = CommentSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)
        return (permissions.IsAuthenticated(), IsAuthorOfComment(),)

    def perform_create(self, serializer):
        instance = serializer.save(author=self.request.user)
        return super(CommentsViewSet, self).perform_create(serializer)

    #def destroy(self, request, *args, **kwargs):
    #    instance = self.get_object()
    #    self.perform_destroy(instance)
    #    return Response(status=status.HTTP_204_NO_CONTENT)

    #def perform_destroy(self, instance):
    #    instance.delete()


class PostCommentsViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.select_related('parent_post').all().order_by('-created_at')
    serializer_class = CommentSerializer

    def get_queryset(self):
        queryset = self.queryset.filter(parent_post=self.kwargs['post_pk'])
        return queryset


class AccountPostsViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.select_related('author').all().order_by('-created_at')
    serializer_class = PostSerializer

    def get_queryset(self):
        queryset = self.queryset.filter(author__username=self.kwargs['account_username'])
        return queryset


class DataImagesViewSet(viewsets.ModelViewSet):
    queryset = DataImage.objects.all()
    serializer_class = DataImageSerializer

    def paginate_queryset(self, queryset, view=None): # turn off pagination
        return None

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)
        return (permissions.IsAuthenticated(), IsAuthorOfImage(),)

    def perform_create(self, serializer):
        instance = serializer.save(author=self.request.user)