from django.db import models
from django.utils import timezone
from authentication.models import Account


class Chat(models.Model):
    members = models.ManyToManyField(Account, related_name='members')
    created_at = models.DateTimeField(auto_now_add=True) 
    updated_at = models.DateTimeField(auto_now=True) 

    def __unicode__(self):
        return 'Chat #{0}'.format(self.id)

class ChatMessage(models.Model):
    chat = models.ForeignKey(Chat, related_name='messages')
    author = models.ForeignKey(Account)
    content = models.TextField()
    created_at = models.DateTimeField(default=timezone.now) #auto_now_add=True
    checked = models.BooleanField(default=False)

    def __unicode__(self):
        if len(self.content) > 20:
            return self.content[:20] + '..'
        else:
            return self.content
    
    def save(self, **kwargs):
        super(ChatMessage, self).save(**kwargs)
        chat = Chat.objects.get(pk=self.chat.pk)
        chat.save()                                # updating chat