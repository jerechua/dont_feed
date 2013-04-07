from django.conf.urls import patterns, include, url

from dont_feed_web import views as web_views

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    url(r'^$', include('dont_feed_web.urls')),


    url(r'^api/', include('dont_feed_api.urls')),
)
