from rest_framework import serializers
from pokegutkowo.models import Players


class TopPlayersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Players
        fields = '__all__'