from rest_framework import serializers
from .models import Border, Stadium


class BorderSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Border
        fields = ('country_id', 'border_data')


class StadiumSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Stadium
        fields = ('city', 'name', 'latitude', 'longitude')
