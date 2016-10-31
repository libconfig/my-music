import requests

def lastfm_cover_search(request, artist, title):
    api_url = 'http://ws.audioscrobbler.com/2.0/'
    api_key = '453d2a7ea911b506d1d606dcc761af98'
    url = api_url+'?method=track.getInfo&api_key='+api_url+'&artist='+artist+'&track='+title+'&format=json'
    data = requests.get(url)
    
    return HttpResponse(data.text)