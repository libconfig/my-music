from rest_framework.routers import DefaultRouter
from .views import *


router = DefaultRouter()
router.register(r'tracks', TrackViewSet)


urlpatterns = router.urls