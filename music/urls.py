from django.conf.urls import include, url
from . import views

urlpatterns = [
	url(r'^login/', include('django_ulogin.urls')),
    url(r'^$', views.track_list, name='track_list'),
    url(r'^search_query/$', views.search_query),
    url(r'^popular_main/$', views.popular_main),
#    url(r'^search_cover/$', views.search_cover),
	url(r'^api/v0/', include('api.urls')),
]