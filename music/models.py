from django.db import models
from django.utils import timezone


class Track(models.Model):
    author = models.ForeignKey('auth.User')
    title = models.CharField(max_length=500)
    track_id = models.IntegerField()
    track_owner_id = models.IntegerField()
    track_artist = models.CharField(max_length=500)
    track_title = models.CharField(max_length=500)
    track_duration = models.IntegerField()
    track_date = models.IntegerField()
    track_url = models.CharField(max_length=500)
    track_lyrics_id = models.IntegerField()
    track_album_id = models.IntegerField()
    track_genre_id = models.IntegerField()
    created_date = models.DateTimeField(default=timezone.now)

class Album(models.Model):
    album_title = models.CharField(max_length=500)
    album_artist_id = models.IntegerField()