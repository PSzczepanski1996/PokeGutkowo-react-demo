# Create your views here.
from rest_framework import generics
from pokegutkowo.models import Players, Post, Settings
from pokegutkowo.serializers import PlayersSerializer, PostSerializer, SettingsSerializer


class PlayersView(generics.ListCreateAPIView):
    queryset = Players.objects.all()
    serializer_class = PlayersSerializer


class PostView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class SettingsView(generics.ListCreateAPIView):
    queryset = Settings.objects.all()
    serializer_class = SettingsSerializer