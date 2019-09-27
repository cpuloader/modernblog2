#from smtplib import SMTPException
import hashlib, random
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth import update_session_auth_hash
from django.http import HttpResponse
from django.core.exceptions import ObjectDoesNotExist
from django.core.mail import send_mail
from rest_framework import permissions, viewsets, status, views
from rest_framework.response import Response

from django.conf import settings
from authentication.models import Account, AvatarImage
from authentication.permissions import IsAccountOwner, IsAuthorOfAvatar
from authentication.serializers import AccountSerializer, AvatarImageSerializer



class AccountViewSet(viewsets.ModelViewSet):
    lookup_field = 'username'
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    def paginate_queryset(self, queryset, view=None): # turn off pagination
        return None

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)
        if self.request.method == 'POST':
            return (permissions.AllowAny(),)
        return (permissions.IsAuthenticated(), IsAccountOwner(),)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            Account.objects.create_user(**serializer.validated_data)
            return Response(serializer.validated_data, status=status.HTTP_201_CREATED)

        return Response({
            'status': 'Bad request',
            'detail': 'Account could not be created with received data.'
        }, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        acc = Account.objects.get(id=request.user.id)
        #print('acc check ', acc.is_active)
        acc.enabled = False
        acc.save()
        #check_acc = Account.objects.get(email=request.user.email)
        #print('saved check ', check_acc.is_active)
        update_session_auth_hash(request, acc)
        return Response({
            'status': 'Deactivated',
            'detail': 'User deactivated.'
        }, status=status.HTTP_204_NO_CONTENT)

'''
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        ava = serializer.data.get('avatarimage')
        print('serializer.data', ava)
        if ava:
            for k,v in ava.items():
                print('field {0}: {1}'.format(k,v))
        return Response(serializer.data)
'''

class LoginView(views.APIView):
    def post(self, request, format=None):
        email = request.data.get('email', None)
        password = request.data.get('password', None)
        account = authenticate(email=email, password=password)

        if account is not None:
            if account.enabled:
                login(request, account)
                serialized = AccountSerializer(account)
                return Response(serialized.data)
            else:
                return Response({
                    'status': 'Unauthorized',
                    'detail': 'This account has been disabled.'
                }, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({
                'status': 'Unauthorized',
                'detail': 'Username/password combination invalid.'
            }, status=status.HTTP_401_UNAUTHORIZED)

class LogoutView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        logout(request)
        return Response({}, status=status.HTTP_204_NO_CONTENT)


def forgot_password(request):
    if request.method == 'GET':
        try:
            user = Account.objects.get(username=request.GET['username'])
        except ObjectDoesNotExist:
            return HttpResponse('Username does not exist.',
                                status=status.HTTP_401_UNAUTHORIZED)

        new_password = hashlib.sha1(str(random.random())).hexdigest()[:8]
        subject = 'New password for {0}'.format(user.username) 
        content = 'Your new password is: {0} \nYou can change it after you login.\
            \n---------------------- \
            \nThis message is automatic, don\'t answer.'.format(new_password)
        try:
            send_mail(subject, content, settings.DEFAULT_FROM_EMAIL,
                      [user.email], fail_silently=False)
        except Exception:
            return HttpResponse('Can\'t send email, will not reset.', status=500)
        user.set_password(new_password)
        user.save()
        return HttpResponse(status=204)


class AvatarViewSet(viewsets.ModelViewSet):
    queryset = AvatarImage.objects.all()
    serializer_class = AvatarImageSerializer

    def paginate_queryset(self, queryset, view=None): # turn off pagination
        return None

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)
        #print(self.request.data)
        return (permissions.IsAuthenticated(), IsAuthorOfAvatar(),)

    def perform_create(self, serializer):
        parent = Account.objects.get(pk=self.request.user.id)
        if hasattr(parent, 'avatarimage'):
            #old_ava = parent.avatarimage.get()
            #old_ava.delete()
            parent.avatarimage.delete()
            print('old avatar deleted!')
        serializer.save(author=self.request.user)