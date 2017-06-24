from django.conf.urls import url
from .views import HomeView, First, Second, Third

app_name = 'home'

urlpatterns = [
    url(r'^$', HomeView.as_view(), name='Home'),
    url(r'^2013', First.as_view(), name='first'),
    url(r'^2015', Second.as_view(), name='second'),
    url(r'^2017', Third.as_view(), name='third'),
]
