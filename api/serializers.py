from rest_framework import serializers
from music.models import Track


class TrackPreviewSerializer(serializers.ModelSerializer):
  class Meta:
    model = Track
    fields = [
      'track_id',
      'track_artist',
      'track_title',
      'track_url',
    ]


class TrackDetailSerializer(serializers.ModelSerializer):
  class Meta:
    model = Track
    fields = [
      'author',
      'title',
      'track_id',
      'track_owner_id',
      'track_artist',
      'track_title',
      'track_duration',
      'track_date',
      'track_url',
      'track_lyrics_id',
      'track_album_id',
      'track_genre_id',
      'created_date',
    ]