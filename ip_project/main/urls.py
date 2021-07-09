from django.urls import path
from . import views
from django.conf.urls import include, url
from .views import *
from rest_framework import routers

router = routers.DefaultRouter()
router.register('users', UserViewSet)
urlpatterns = [
    url(r'^company/$', views.company_list),
    url(r'^rabota/$', views.rabota_list),
    url(r'^company/(?P<id>[0-9]+)$', views.company_detail),
    # path('users/', views.UserView.as_view(), name='users'),
    path('', views.index),
    path('about/', views.about),
    path('', include(router.urls))
]
