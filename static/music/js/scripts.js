$(function() {
    $.ajax({
        url : "/popular_main/", // the endpoint
        type : "POST", // http method
        data : { the_post : $('#searchValue').val()}, // data sent with the post request
        // handle a successful response
        success : function(json) {
            //console.log(json);
            popular_result(json);
            play_music();
        },
        // handle a non-successful response
        error : function(xhr,errmsg,err) {
            $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
        }
    });


	$('#searchForm').on('submit', function(event){
	    event.preventDefault();
	    search_music();
	});

})

$.ajaxSetup({ 
 beforeSend: function(xhr, settings) {
     function getCookie(name) {
         var cookieValue = null;
         if (document.cookie && document.cookie != '') {
             var cookies = document.cookie.split(';');
             for (var i = 0; i < cookies.length; i++) {
                 var cookie = jQuery.trim(cookies[i]);
                 // Does this cookie string begin with the name we want?
             if (cookie.substring(0, name.length + 1) == (name + '=')) {
                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                 break;
             }
         }
     }
     return cookieValue;
     }
     if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
         // Only send the token to relative URLs i.e. locally.
         xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
     }
 }
 });

function search_music() {
    $.ajax({
	    url : "/search_query/", // the endpoint
	    type : "POST", // http method
	    data : { the_post : $('#searchValue').val()}, // data sent with the post request
	    // handle a successful response
	    success : function(json) {
	        $('#searchValue').val(''); // remove the value from the input
	        $('#result ol').html('');
	        ajax_result(json);
	        play_music();
	    },
	    // handle a non-successful response
	    error : function(xhr,errmsg,err) {
	        $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
	            " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
	        console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
	    }
	});
};


function popular_result(json)  {
    var elements = json;

    for (var i=0;i<elements.length;i++){
      var element = elements[i];
      artist = element.artist;
      title = element.title;
      url = element.url;

      $('#result ol').append('<li style="position: relative;"><a href="#" data-src="'+url+'" data-artist="'+artist+'" data-title="'+title+'">'+artist+'</a><br>'+title+'<a href="'+url+'" title="Скачать" style="float:right" download target="_blank"><i class="glyphicon glyphicon-save"></i></a></li>');
    }
}

function ajax_result(json)	{
	var elements = json.items;

	for (var i=0;i<elements.length;i++){
	  var element = elements[i];
	  artist = element.artist;
	  title = element.title;
	  url = element.url;

	  $('#result ol').append('<li style="position: relative;"><a href="#" data-src="'+url+'" data-artist="'+artist+'" data-title="'+title+'">'+artist+'</a><br>'+title+'<a href="'+url+'" title="Скачать" style="float:right" download target="_blank"><i class="glyphicon glyphicon-save"></i></a></li>');
	}
}

function play_music()	{
	// Setup the player to autoplay the next track
    var a = audiojs.createAll({
        trackEnded: function() {
            var next = $('ol li.playing').next();
            if (!next.length) next = $('ol li').first();
            next.addClass('playing').siblings().removeClass('playing');
            audio.load($('a', next).attr('data-src'));
            artist = $('a', next).attr('data-artist');
            title = $('a', next).attr('data-title');
            audio.play();
            search_cover(artist, title);
        }
    });

    // Load in the first track
    var audio = a[0];
    first = $('ol a').attr('data-src');
    $('ol li').first().addClass('playing');
    audio.load(first);

    // Load in a track on click
    $('ol li').click(function(e) {
        e.preventDefault();
        $(this).addClass('playing').siblings().removeClass('playing');
        audio.load($('a', this).attr('data-src'));
        artist = $('a', this).attr('data-artist');
        title = $('a', this).attr('data-title');
        audio.play();
        search_cover(artist, title);
    });
    // Keyboard shortcuts
    $(document).keydown(function(e) {
        var unicode = e.charCode ? e.charCode : e.keyCode;
        // right arrow
        if (unicode == 39) {
            var next = $('li.playing').next();
            if (!next.length) next = $('ol li').first();
            next.click();
            // back arrow
        } else if (unicode == 37) {
            var prev = $('li.playing').prev();
            if (!prev.length) prev = $('ol li').last();
            prev.click();
            // spacebar
        } else if (unicode == 32) {
            audio.playPause();
        }
    })
}

function search_cover(artist, title) {
    artistI = artist.replace(/[^\w\d]/g, '+');
    titleI = title.replace(/[^\w\d]/g, '+');
    $('.cover_block').html('');
    fmurl = 'http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=453d2a7ea911b506d1d606dcc761af98&artist='+artistI+'&track='+titleI+'&format=json';

    $.getJSON(fmurl, function(data) {
        $.each(data, function(i, item){
            console.log(this);

            //url = stripslashes(item.url);
            if(item.name) song = item.name;

            if(item.artist.name) artist = item.artist.name;
            

            //console.log(data.track);
            if(item.album && item.album.image[3]['#text'] !=''){
                album = item.album.title;
                img_src = item.album.image[3]['#text'];
                $('.cover_block').append('<img src="'+img_src+'"" class="img-responsive">');
            }else{
                
            }
        });
    });

}
