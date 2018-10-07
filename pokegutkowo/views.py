# Create your views here.
from rest_framework import generics
from pokegutkowo.models import Players, Settings
from pokegutkowo.serializers import PlayersSerializer, SettingsSerializer


class PlayersView(generics.ListCreateAPIView):
    queryset = Players.objects.all()
    serializer_class = PlayersSerializer


class SettingsView(generics.ListCreateAPIView):
    queryset = Settings.objects.all()
    serializer_class = SettingsSerializer