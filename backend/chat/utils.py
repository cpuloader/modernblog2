from django.core.mail import send_mail
from django.conf import settings


def send_notification_email(receivers, message):
    content = u'Your received new message from user {0} on modernblog.pythonanywhere.com\nThis is the message:\
            \n{1}\n\n----------------------------------\nDon\'t answer to this email. \
            \nIt\'s automatic.'.format(message.author.username, message.content)
    send_mail("New message from " + message.author.username, content, 
                      settings.DEFAULT_FROM_EMAIL,
                      receivers, fail_silently=True)
