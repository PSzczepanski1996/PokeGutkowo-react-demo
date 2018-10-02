# Create your views here.
from rest_framework import generics
from pokegutkowo.models import Players
from pokegutkowo.serializers import TopPlayersSerializer


class PlayersView(generics.ListCreateAPIView):
    queryset = Players.objects.all()
    serializer_class = TopPlayersSerializer
