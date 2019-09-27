import os
from django.db import models
from django.db.models.signals import post_delete
from django.dispatch import receiver

from authentication.models import Account
from authentication.utils import resize_picture

class Post(models.Model):
    author = models.ForeignKey(Account)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    draft = models.BooleanField(default=False)

    def __unicode__(self):
        if len(self.content) > 20:
            return self.content[:20] + '..'
        else:
            return self.content


class Comment(models.Model):
    author = models.ForeignKey(Account)
    parent_post = models.ForeignKey(Post, related_name='comments')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        if len(self.content) > 20:
            return self.content[:20] + '..'
        else:
            return self.content

class DataImage(models.Model):
    author = models.ForeignKey(Account, related_name='account_images')
    parent_post = models.ForeignKey(Post, related_name='post_images', blank=True, null=True, on_delete=models.CASCADE)
    parent_comment = models.ForeignKey(Comment, related_name='comment_images', blank=True, null=True, on_delete=models.CASCADE)
    picture = models.ImageField(upload_to='uploaded_pics', blank=True)
    picture_for_post = models.ImageField(upload_to='uploaded_pics/post', blank=True)
    picture_for_preview = models.ImageField(upload_to='uploaded_pics/preview', blank=True)

    def __unicode__(self):
        return self.picture.name

    def save(self, *args, **kwargs):
        super(DataImage, self).save(*args, **kwargs)
        resize_picture(self.picture_for_post, 1000)
        resize_picture(self.picture_for_preview, 150)

@receiver(post_delete, sender=DataImage)
def image_post_delete_handler(sender, **kwargs):
    image = kwargs['instance']
    storage, path = image.picture.storage, image.picture.path
    storage.delete(path)
    try:
        storage_for_post, path_for_post = image.picture_for_post.storage, image.picture_for_post.path
        storage_for_preview, path_for_preview = image.picture_for_preview.storage, image.picture_for_preview.path
    except ValueError as err:
        print(err)
        return
    storage_for_post.delete(path_for_post)
    storage_for_preview.delete(path_for_preview)

