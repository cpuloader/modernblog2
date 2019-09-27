from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.generic.base import TemplateView, View
from django.shortcuts import redirect
from django.core.urlresolvers import reverse
from django.utils.decorators import method_decorator
from django.conf import settings

class IndexView(TemplateView):
    template_name = 'index.html'

    @method_decorator(ensure_csrf_cookie)
    def dispatch(self, *args, **kwargs):
        print('DEBUG:', settings.DEBUG)
        return super(IndexView, self).dispatch(*args, **kwargs)
