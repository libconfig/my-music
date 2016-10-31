from django.shortcuts import render
from django.core import serializers
from django.http import HttpResponse, HttpRequest
from django.http import JsonResponse
from django.shortcuts import redirect
from .models import Track
from .my_data import MyVKData
import vk_requests
import requests
import json

# Create your views here.
def track_list(request):
	form = Track()
	return render(request, 'music/track_list.html', {'form': form})

def popular_main(request):
	# Genre
	# 1 - Rock
	# 2 - Pop
	# 3 - Rap & Hip-Hop
	# 4 - Easy Listening
	# 5 - House & Dance
	# 6 - Instrumental
	# 7 - Metal
	# 8 - Dubstep
	# 21 - Alternative
	# 1001 - Jazz & Blues
	# 10 - Drum & Bass
	# 11 - Trance
	# 12 - Chanson
	# 13 - Ethnic
	# 14 - Acoustic & Vocal
	# 15 - Reggae
	# 16 - Classical
	# 17 - Indie Pop
	# 19 - Speech
	# 22 - Electropop & Disco
	# 18 - Other
	genre = 10
	session = vk_requests.create_api(MyVKData.APP_ID, login=MyVKData.LOGIN, password=MyVKData.PASS,scope=['offline', 'audio'], api_version='5.59')
	vkapi = vk_requests.API(session)
	data = vkapi.audio.getPopular(genre_id=genre, count=100)
	#request.POST.get(data)

	return HttpResponse(
        json.dumps(data),
        content_type="application/json"
    )

def search_query(request):
	if request.method == 'POST':

		post_text = request.POST.get('the_post')
		session = vk_requests.create_api(MyVKData.APP_ID, login=MyVKData.LOGIN, password=MyVKData.PASS,scope=['offline', 'audio'], api_version='5.59')
		vkapi = vk_requests.API(session)
		data = vkapi.audio.search(q=post_text,auto_complete=0,sort=2, count=50)
		return HttpResponse(
            json.dumps(data),
            content_type="application/json"
        )

	else:
		return HttpResponse(json.dumps({"nothing to see": "this isn't happening"}),content_type="application/json")

#def search_cover(request):
#	if request.method == 'POST' and request.is_ajax():
#
#		artist = request.POST.get("artist")
#		title = request.POST.get("title")
#		
#		data = {}
#
#		api_url = 'http://ws.audioscrobbler.com/2.0/'
#		api_key = '453d2a7ea911b506d1d606dcc761af98'
#		url = api_url+'?method=track.getInfo&api_key='+api_key+'&artist='+artist+'&track='+title
#		data["album"] = requests.get(url)
#
#		print(data)
#		return HttpResponse(
#			json.dumps(data),
#			content_type="application/json"
#		)