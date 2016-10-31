from rest_framework import viewsets
from .serializers import *


class TrackViewSet(viewsets.ReadOnlyModelViewSet):
   queryset = Track.objects.all()

   def get_serializer_class(self):
       if self.action == 'list':
           return TrackPreviewSerializer
       return TrackDetailSerializer
