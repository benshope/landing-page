// customize box

var HTML = '<!-- CustomizeBox -->'; 
HTML += '<div id="customize">';
HTML += '	<span class="close"></span>';	
HTML += '	<img src="customizer/img/customize_logo.png">';
HTML += '	<div class="customize_wrap">';
/*
HTML += '	<h2>Choose a preset:</h2>';
HTML += '	<div class="presets">';
HTML += '		<a href="#" class="dark">#000000</a>';
HTML += '		<a href="#" class="light">#ffffff</a>';
HTML += '		<a href="#" class="color">#54375e</a>';
HTML += '	</div>';
HTML += '	<hr />';
*/
/*
HTML += '	<h2>Text color:</h2>';	 
HTML += '	<input type="text" class="color_input color_text" value=""><span class="selected_color">&nbsp;</span>';	
HTML += '	<form>';
HTML += '		<div class="colorpicker text"></div>';
HTML += '	</form>';	
HTML += '	<hr />';	
HTML += '	<h2>Background color:</h2>';	 
HTML += '	<input type="text" class="color_input color_bg" value=""><span class="selected_color">&nbsp;</span>';	
HTML += '	<form>';
HTML += '		<div class="colorpicker bg"></div>';
HTML += '	</form>';	
HTML += '	<hr />';
*/	  
HTML += '	<h2>Background Image:</h2>';
HTML += '	<form>';
HTML += '		<input type="text" class="bg-image with-btn" value=""><button class="btn apply-bg-image">Apply</button>';
HTML += '	</form>';	 
HTML += '	<hr />';  
HTML += '	<h2>Background Video (Youtube Link):</h2>';
HTML += '	<form>';
HTML += '		<input type="text" class="bg-video with-btn" value=""><button class="btn apply-bg-video">Apply</button>';
HTML += '	</form>';	
HTML += '	<hr />'; 
HTML += '	<form>'; 
HTML += '		<li><input type="checkbox" name="video-mute" checked="checked" /> <span>Mute the video</span></li>';
HTML += '	</form>';	
HTML += '	<hr />'; 
/*
HTML += '	<h2>Background Video Opacity:</h2>';
HTML += '	<form>';
HTML += '		<div type="text" class="bg-video-opacity"></div>';
HTML += '	</form>'; 
HTML += '	<hr />'; 
*/
HTML += '	<h2>Launch Date:</h2>';
HTML += '	<form>';
HTML += '		<input type="text" class="datepicker" value="">';
HTML += '	</form>';	 
HTML += '	<hr />';	  
HTML += '	<h2>Select the content:</h2>';
HTML += '	<form class="set-content">';
HTML += '		<ul>';
HTML += '			<li class="new"><input type="checkbox" name="header" checked="checked" /> <span>Header</span></li>';
HTML += '			<li><input type="checkbox" name="countdown-widget" checked="checked" /> <span>Countdown</span></li>';
HTML += '			<li><input type="checkbox" name="title" checked="checked" /> <span>Title</span></li>';
HTML += '			<li><input type="checkbox" name="description" checked="checked" /> <span>Description</span></li>';
HTML += '			<li><input type="checkbox" name="newsletter" checked="checked" /> <span>Newsletter</span></li>';
HTML += '			<li><input type="checkbox" name="social" checked="checked" /> <span>Twitter / Find Us</span></li>';
HTML += '			<li><input type="checkbox" name="writeus" checked="checked" /> <span>Write Us</span></li>';
HTML += '		</ul>';
HTML += '	</form>';	  
HTML += '	</div>';
HTML += '</div>';

function initCustomizerValues() {

	var body_text = '#'+hexFromRGB($('body').css('color'));
	var background_color = '#'+hexFromRGB($('div#header').css('background-color'));
	var background_image = $('#bg-image').css('background-image').replace('url(', '').replace(')', '');
	
	//$('#customize .color_text').val(body_text).next().css({'background-color':body_text});
	//$('#customize .color_bg').val(background_color).next().css({'background-color':background_color});
	//$('#customize .bg-image').val(background_image);
/*

	if($("#bg-video").data('videoid') != '') {
		var video_id = $("#bg-video").data('videoid');
		$('#customize .bg-video').val('http://www.youtube.com/watch?v='+video_id);
	}	
*/
	
	$("#customize .close").click();
	setTimeout(function() {
		$("#customize .close").click();
	},2000);
	

}
function hexFromRGB(rgb) {
	rgb = rgb.replace('rgb(', '');
	rgb = rgb.replace(')', '');
	rgb = rgb.split(', ');
	var r = parseInt(rgb[0]);
	var g = parseInt(rgb[1]);
	var b = parseInt(rgb[2]);

    var hex = [
      r.toString( 16 ),
      g.toString( 16 ),
      b.toString( 16 )
    ];
    
    $.each( hex, function( nr, val ) {
      if ( val.length === 1 ) {
        hex[ nr ] = "0" + val;
      }
    });

    return hex.join( "" ).toUpperCase();
}
function getContrast50(hexcolor){
	if(hexcolor.length<7||hexcolor.length>7){
		return false;
	}
	hexcolor = hexcolor.split('#');
	hexcolor = hexcolor[1];
    return (parseInt(hexcolor, 16) > 0xffffff/2) ? '#000000':'#FFFFFF';
}

function lightOrDark(hexcolor, inverse){
	if(hexcolor.length<7||hexcolor.length>7){
		return false;
	}
	hexcolor = hexcolor.split('#');
	hexcolor = hexcolor[1];
	if(inverse != null && inverse == true) {
		return (parseInt(hexcolor, 16) > 0xffffff/2) ? 'dark':'light';
	}
    return (parseInt(hexcolor, 16) > 0xffffff/2) ? 'light':'dark';
}



function defaultVideoOpacity() {
	var opacity = $("#tubular-container").css('opacity');
	if(typeof(opacity) != "undefined") {
		opacity = (opacity * 100);
		return opacity;
	}else{
		return 50;
	}	
}
function updateVideoOpacity() {
	var opacity = $( "#customize .bg-video-opacity" ).slider( "value" );
	opacity = (opacity * 1) / 100;
	opacity = parseFloat(opacity).toFixed(1);
	$("#tubular-container").css({opacity:opacity});
}
function hideVideo() {
	
	if(typeof(player) != "undefined")
		player.stopVideo();
		
	$('#tubular-container').css('z-index', '-1').hide();
	$('#tubular-shield').hide();
	
}
function showVideo() {
	
	if(typeof(player) != "undefined")
		player.playVideo();
		
	$('#tubular-container').css('z-index', '1').show();
	$('#tubular-shield').show();

	
}
function switchVideo(video_id) {
	
	if(typeof(player) != "undefined") {
		player.loadVideoById(video_id);

		if(video_id != '')
			showVideo();
		else{
			hideVideo();
		}	
	}
}

function startLoading() {

	$("#bg-loading").show().animate({opacity:0.9}, 500);
}

function stopLoading() {
	
	timeout = 2000;
	if(_tubularLoaded() && !firstLoad) {
		timeout = 4000;
		firstLoad = true;
	}	
	$("#bg-loading").delay(timeout).animate({opacity:0}, 500, function() {
	
		$(this).delay(500).hide();
	});
}

function youtubeIDextract(url) 
{ 
	var youtube_id; 
	youtube_id = url.replace(/^[^v]+v.(.{11}).*/,"$1"); 
	return youtube_id; 
}
	
$(document).ready(function() {

	$("<link/>", {
   		rel: "stylesheet",
  		type: "text/css",
   		href: "customizer/css/style.css"
	}).appendTo("head");

	$("<link/>", {
   		rel: "stylesheet",
  		type: "text/css",
   		href: "customizer/farbtastic/farbtastic.css"
	}).appendTo("head");
	
	
	$('body').append(HTML);
	
/*
	
	$.getScript('customizer/farbtastic/farbtastic.js', function() {
		
		$('#customize .selected_color').click(function() {
			$(this).prev().click();
		});
		$('#customize .colorpicker.text').farbtastic(function(color){
			$('#customize .color_text').val(color.toUpperCase()).next().css({'background-color':color});
			$('#customize .colorpicker.text').fadeOut();
			$("body").css({color:color});
			$("div.section.newsletter fieldset, div.section.newsletter input").css({'color': color, 'border-color': color});
			$("div.section.newsletter input.submit").css({'background-color':color, 'color': getContrast50(color)});
			$('#bg-overlay').css({'background-image':'url(assets/img/overlay_'+lightOrDark(color, true)+'.png)'});

		});

		$('#customize .color_text').click(function() {
			$('#customize .colorpicker').hide();
			$('#customize .colorpicker.text').fadeIn();
		});

		$('#customize .color_text').change(function() {
			$.farbtastic("#customize .colorpicker.text").setColor($(this).val());
		});
		
		
		$('#customize .colorpicker.bg').farbtastic(function(color){
			$('#customize .color_bg').val(color.toUpperCase()).next().css({'background-color':color});;
			$('#customize .colorpicker.bg').fadeOut();
			$("div#header,#bg-overlay").css({'background-color': color});
			
		});

		$('#customize .color_bg').click(function() {
			$('#customize .colorpicker').hide();
			$('#customize .colorpicker.bg').fadeIn();
		});

		$('#customize .color_bg').change(function() {
			$.farbtastic("#customize .colorpicker.bg").setColor($(this).val());
		});

	});
*/


	//$.getScript('customizer/js/jquery.screwdefaultbuttonsV2.min.js', function() {
		
		$("#customize input[type=checkbox]").screwDefaultButtons({
		    image: 'url(customizer/img/mini_checkbox.png)',
		    width: 22,
		    height: 22
		});	
	//});
	
/*

	$.getScript('customizer/js/jquery.slimscroll.min.js', function() {
		
		$("#customize .customize_wrap").slimScroll({
        	height: '550px',
        	railVisible: true,
        	alwaysVisible: true,
            color: '#eee',
            railColor: '#000',
            distance: '-10px',
            size: '8px'
   	 	});
   	 	$("#customize .slimScrollDiv").delay(400).css('overflow', 'visible');
	});	
*/

	var defaultDate = new Date($('#countdown-widget').countdown('option', 'until'));
	var year = defaultDate.getUTCFullYear();
	var month = defaultDate.getUTCMonth()+1;
	var day = defaultDate.getUTCDate();
	defaultDate = year+'-'+month+'-'+day;
	
	$("#customize .close").toggle(function(event) {
		$('#customize').animate({left:'-285px'},300);	
		$("#customize .close").css({'background-image':'url(customizer/img/customize_open.png)'});
	
	},function(event) {
		$('#customize').animate({left:'0'},300);
		$("#customize .close").css({'background-image':'url(customizer/img/customize_close.png)'});
	});
	
	$("#customize input.datepicker").datepicker({
		dateFormat: "yy-mm-dd",
		minDate: +1,
		onSelect: function() {
			$('div.section.countdown').hide();
			launchTime = new Date($(this).val()); // Set launch: [year], [month], [day], [hour]...
			if(launchTime > new Date()) {
				$('#countdown-widget').countdown('option', 'until', launchTime);
				$('div.section.countdown').fadeIn("medium");
			}	
			_resize();
		}
	}).val(defaultDate);
	
	$("#customize input[name='video-mute']").change(function () {
		if ( $(this).is(":checked") ) {
			
			if(typeof(player) != "undefined" && typeof(player.mute) != "undefined") {
				player.mute();
			}
				
		} else {
		
			if(typeof(player) != "undefined" && typeof(player.unMute) != "undefined") {
				player.unMute();
			}
		}	
	 
	});
		
	$("#customize form.set-content input[type=checkbox]").change(function () {
				
		var input_name = $(this).attr("name");
		
		if ( $(this).is(":checked") ) {
			$("." + input_name).slideDown();
			
			if(input_name == 'header')
				$('body').removeClass('no-header');
			
		} else {
			$("." + input_name).slideUp();
			
			if(input_name == 'header')
				$('body').addClass('no-header');
		}

	 	_resize();
	});
	
/*
	$("#customize .colors a").each(function () {
		$(this).css("background-color", $(this).text());
	});
	
	$("#customize .presets a").each(function () {
		$(this).css("background-image", 'url(customizer/img/presets/'+$(this).attr('class')+'.jpg)');
	});	
	
*/
	
	$("#customize button.apply-bg-image").click(function(e) {
		
		e.preventDefault();
		var btn = $(this);
		
		startLoading();

	
		setTimeout(function() {
				
			hideVideo();
			$("#bg-image").removeAttr('style');
			var image = btn.prev().val();
			$('#bg-image').css({'background-image':'url('+image+')', opacity:1});
			
			stopLoading();
				
		},500);
			
	});

	$("#customize button.apply-bg-video").click(function(e) {
		
		e.preventDefault();
		var btn = $(this);
		
		startLoading();
		
		setTimeout(function() {
		
			hideVideo();
			$("#bg-image").removeAttr('style');
	
			var video = btn.prev().val();
			var video_id = youtubeIDextract(video);
			if(typeof(player) != "undefined") {
				switchVideo(video_id);
			}else{	
				$('#bg-video').tubular({videoId: video_id, wrapperZIndex: '1', start: 10});
			}	
			showVideo();	
			$("#bg-image").css({opacity:1});
		
			stopLoading();
			
		},500);
		
	});


/*
	$( "#customize .bg-video-opacity" ).slider({
      	orientation: "horizontal",
      	range: "min",
      	max: 100,
      	value: defaultVideoOpacity() ,
      	slide: updateVideoOpacity,
      	change: updateVideoOpacity
    });
    
*/
		
	$("#customize .colors a, #customize .presets a").click(function () {
		$('#content').mousewheel();
		var color = $(this).attr("class");
		var color_hex = $(this).text();
		
		hideVideo();
		
		startLoading();
		
		setTimeout(function() {
	
			$("body,div#header,#bg-overlay,#bg-image").removeAttr('style');
			$("link.color").attr("href",'assets/css/colors/'+color+'.css');
			light_or_dark = lightOrDark(color_hex);
			$("div#logo img").attr("src",'assets/img/logo_'+light_or_dark+'.png');	
			$("#bg-image").css({opacity:1});
				
			stopLoading();
				
		},1000);	

		
		setTimeout(function() {
			initCustomizerValues();
		}, 500);

	});	
	
	initCustomizerValues();
			
});
