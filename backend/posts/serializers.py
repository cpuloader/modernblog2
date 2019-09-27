from rest_framework import serializers

from authentication.serializers import AccountSerializer
from posts.models import Post, Comment, DataImage

class DataImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = DataImage
        fields = ('id', 'author', 'parent_post', 'parent_comment', 'picture', 'picture_for_post', 'picture_for_preview')
        read_only_fields = ('id', 'author', 'picture_for_post', 'picture_for_preview')

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(DataImageSerializer, self).get_validation_exclusions()
        return exclusions + ['author'] + ['picture_for_post'] + ['picture_for_preview']

    def create(self, validated_data):
        validated_data['picture_for_post'] = validated_data['picture']
        validated_data['picture_for_preview'] = validated_data['picture']
        instance = DataImage.objects.create(**validated_data)
        return instance


class PostSerializer(serializers.ModelSerializer):
    author = AccountSerializer(read_only=True, required=False)
    comments = serializers.PrimaryKeyRelatedField(many=True, read_only=True, allow_null=True)
    post_images = DataImageSerializer(many=True, read_only=True, required=False)

    class Meta:
        model = Post
        fields = ('id', 'author', 'content', 'created_at', 'updated_at', 
                  'comments', 'post_images', 'draft')
        read_only_fields = ('id', 'created_at', 'updated_at')

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(PostSerializer, self).get_validation_exclusions()
        return exclusions + ['author']

class CommentSerializer(serializers.ModelSerializer):
    author = AccountSerializer(read_only=True, required=False)
    comment_images = DataImageSerializer(many=True, read_only=True, required=False)

    class Meta:
        model = Comment
        fields = ('id', 'author', 'parent_post', 'content', 'created_at', 'updated_at', 'comment_images')
        read_only_fields = ('id', 'created_at', 'updated_at')

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(CommentSerializer, self).get_validation_exclusions()
        return exclusions + ['author'] #+ ['parent_post']
