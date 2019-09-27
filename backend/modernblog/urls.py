from django.conf.urls import include, url
from django.contrib import admin
from rest_framework_nested import routers
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic.base import RedirectView

from authentication.views import AccountViewSet, LoginView, LogoutView, forgot_password, AvatarViewSet
from posts.views import AccountPostsViewSet, PostViewSet, CommentsViewSet, PostCommentsViewSet, DataImagesViewSet
from chat.views import ChatsViewSet, MessagesViewSet, ChatMessagesViewSet, AccountChatsViewSet, ObserverViewSet
from .views import IndexView

router = routers.SimpleRouter()
router.register(r'accounts', AccountViewSet)
router.register(r'avatars', AvatarViewSet)
router.register(r'posts', PostViewSet)
router.register(r'comments', CommentsViewSet)
router.register(r'chats', ChatsViewSet)
router.register(r'messages', MessagesViewSet)
router.register(r'observer', ObserverViewSet)
router.register(r'images', DataImagesViewSet)

posts_router = routers.NestedSimpleRouter( #router for getting comments in post view
    router, r'posts', lookup='post'
)
posts_router.register(r'comments', PostCommentsViewSet)

accounts_router = routers.NestedSimpleRouter( #router for getting posts in account view
    router, r'accounts', lookup='account'
)
accounts_router.register(r'posts', AccountPostsViewSet)
accounts_router.register(r'chats', AccountChatsViewSet)

chats_router = routers.NestedSimpleRouter( #router for getting messages in chat view
    router, r'chats', lookup='chat'
)
chats_router.register(r'messages', ChatMessagesViewSet)  #api/v1/chats/id/messages/

admin.autodiscover()

urlpatterns = [
    url(r'^api/v1/', include(router.urls)),
    url(r'^api/v1/', include(posts_router.urls)),
    url(r'^api/v1/', include(accounts_router.urls)),
    url(r'^api/v1/', include(chats_router.urls)),
    url(r'^api/v1/passreminder/$', forgot_password),
    url(r'^api/v1/auth/login/$', LoginView.as_view(), name='login'),
    url(r'^api/v1/auth/logout/$', LogoutView.as_view(), name='logout'),
    url(r'^profile/', IndexView.as_view(), name='index'),
    url(r'^settings/', IndexView.as_view(), name='index'),
    url(r'^login/', IndexView.as_view(), name='index'),
    url(r'^register/', IndexView.as_view(), name='index'),
    url(r'^remind-password/', IndexView.as_view(), name='index'),
    url(r'^user/.[^/]+', IndexView.as_view(), name='index'),
    url(r'^post/[0-9]+', IndexView.as_view(), name='index'),

    url(r'^$', IndexView.as_view(), name='index'),
    url(r'^admin/', include(admin.site.urls)),

] 

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)