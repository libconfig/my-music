from rest_framework import serializers
from music.models import Track


class TrackSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = ('id', 'author', 'text', 'created', 'updated')