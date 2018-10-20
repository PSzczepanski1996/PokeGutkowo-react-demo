from rest_framework import serializers
from pokegutkowo.models import Players, Post, Settings


class PlayersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Players
        fields = '__all__'


class PostSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(source='author.nickname', read_only=True)

    class Meta:
        model = Post
        fields = ('title', 'context', 'author')


class SettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Settings
        fields = '__all__'
