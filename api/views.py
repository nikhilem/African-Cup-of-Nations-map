from rest_framework import viewsets
from .models import Border, Stadium
from .serializers import BorderSerializer, StadiumSerializer


class BorderViewSet(viewsets.ModelViewSet):
    queryset = Border.objects.all()
    serializer_class = BorderSerializer


class StadiumViewSet(viewsets.ModelViewSet):
    queryset = Stadium.objects.all()
    serializer_class = StadiumSerializer
