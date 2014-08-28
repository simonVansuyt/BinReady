var time = 0,
	running = 0;

function onload(){
	document.addEventListener("deviceready", ready, false);
}

function ready(){

	var $startPause = $("#startPause"),
		$reset = $("#reset"),
		$moreIcon = $("#moreIcon");

	$moreIcon.fadeIn(1750);

	
	$("#container").show();

	// de more konop functie

	$moreIcon.bind("touchstart", function(){
		$(this).animate({
			"width": "49px",
			"margin": "5px"
		}, 100);

		if (running == 0){

			moreIcon();

		}else if (running == 1){
			alertify.confirm("Do you want to pause the watch?", function(e){
				if(e){
					running = 0;
					$("#startPause").text("Resume");
			
					moreIcon();
				}
			});

		}

	}).bind("touchend", function(){
		$(this).animate({
			"width": "59px",
			"margin": "0px"
		}, 100);
	});

	// de .page functie

	$(".page").on("click", function(){

		var $back = $(".back"),
			$this = $(this),
			findP = $this.find($("p")).text();

		if($back.length == 0){

			$("ul li.page").fadeOut(250);
			$this.fadeIn(500)
				 .find("p").addClass("thisBack").fadeIn(500);

			if(findP == "How it works"){

				$("#howitworks").fadeIn(500);

			}else{

				$("#" + findP).fadeIn(500);
			
			}

			$("<h2><</h2>").addClass("back").appendTo($this);

		}else{

			back(500);

		}

	});

	// system version span:last
	
	$("#build p:last").text(device.platform + "" + device.version);	

	// clock animation

	setInterval(function(){clockAni();}, 1000);

	// de start pause resume functie

	$startPause.bind("touchstart",function(){
		$(this).animate({
			"width" : "90px",
			"height" : "40px",
			"marginTop" : "5px"
		}, 100);

		if(running == 0) {
			
			running = 1;
			increment();
		
			$startPause.text("Pause");

		}else{
			running = 0;

			$startPause.text("Resume");
		}

	}).bind("touchend", function(){
		$(this).animate({
			"width" : "100px",
			"height" : "50px",
			"marginTop" : "0px"
		}, 100);
	});

	// de reset functie

	$reset.bind("touchstart",function(){
		running = 0;
		time = 0;

		$(this).animate({
			"width": "40px",
			"marginTop": "5px",
			"marginRight": "25px",
			"marginLeft": "5px"
		}, 100);
		$startPause.text("Start");
		$("#toeren p").each(function(){
			$(this).slideUp("slow").remove();
		});
		$(".select").removeClass(".select");

	}).bind("touchend", function(){
		$(this).animate({
			"width": "50px",
			"marginTop": "0px",
			"marginLeft": "0px",
			"marginRight": "20px"
		}, 100);
	});
	
	// de lap functie

	$("#lapen").on("click",function(){

		var lapText = $("#lapextra").text(),
			$toerP = $("#toeren p").length,
			lap = "lap" + " " +($toerP + 1),
			prevLap = $("#tijd").eq($("#tijd").length-1).text(),
			newSplit = lapText.split(":"),
			oudSplit = prevLap.split(":");
			h = parseFloat(newSplit[0]) - parseFloat(oudSplit[0]),
			m = parseFloat(newSplit[1]) - parseFloat(oudSplit[1]),
			s = parseFloat(newSplit[2]) - parseFloat(oudSplit[2]),
			t = parseFloat(newSplit[3]) - parseFloat(oudSplit[3]),
			verschil = h + ":" + m + ":" + s + ":" + t;


		if(verschil == "NaN:NaN:NaN:NaN"){
			verschil = "00:00:00:0";
		}else{

			if(t <= -1){
				t = 10 - Math.abs(t);
				s = s - 1;
			}
			if(s <= -1){
				s = 60 - Math.abs(s);
				m = m - 1;
		 	}
			if(m <= -1){
				m = 60 - Math.abs(m);
				h = h - 1;
		 			}
			if (h < 10){
				h = "0" +  h;
			}
			if (m < 10){
				m = "0" + m;
			}
			if (s < 10){
				s = "0" + s;
			}

			verschil = h + ":" + m + ":" + s + ":" + t;
		
		}

		$(this).animate({rotate: "360deg"});

		if(time === 0){

			alertify.alert("You have to start the watch.");

		}else if(lapText == $("#toeren #tijd").first().text()){

			alertify.alert("You have already a lap whit this time.");

		}else{

			$("<p></p>").prependTo(
				$("#toeren")).html(
					"<span id='lap'>" + lap + "</span>" +
					"<span class='laptext' id='tijd'>" + lapText + "</span>" +
					"<span id='verschil'>" + verschil + "</span><br/>"
				);
		}
		
	}).bind("touchend", function(){
		$(this).animate({
			"width": "50px",
			"marginTop": "0px",
			"marginLeft": "20px",
			"marginRight": "0px"
		}, 100);
	});

	//sharing functions
	
	var text = "Download now BinReady for free.",
		url = "https://play.google.com/store/apps/details?id=com.simonvansuyt.binready";

	//facebook
	$("#facebook").bind("touchstart", function(){

		window.plugins.socialsharing.shareViaFacebook(text, url);
	});
	
	//twitter
	$("#twitter").bind("touchstart", function(){

		window.plugins.socialsharing.shareViaTwitter(text, url);
	});
	
	//more
	$("#share-more").bind("touchstart", function(){

		window.plugins.socialsharing.share(text, null, url, null, null);
	
	});

	//settings 
	var uiEl = "header, #startPause, select";

	//change color clock

	$("#colorClock").change(function(){
		settings("#colorClock", ".circle");
	});
	
	//change color ui
	
	$("#ui").change(function(){
		settings("#ui", uiEl);
	});
	
	//make ui lighten

	$("#uilig").change(function(){
		var number = $(this).val() / 100;

		$("#ulVal").text(number);
		$(uiEl).css("opacity", number);

	});
	
	//blur clock
	
	$("#blur").change(function(){
		var number =  $(this).val() / 100;

		$("#blurVal").text(number + "px");
		$(".circle").css("-webkit-filter", "blur(" + number + "px)");
	});

}// einde dom is ready function

//settings

function settings(select, target){
		var $option = $(select).find("option:selected"),
			clock = $option.attr("value");

		$(target).css("background", clock);
}


// more icon function

function moreIcon() {
	var $h1 = $("header h1");

	$("#overlay, #more").slideToggle(500);
	$("#container").hide();

	if( $h1.text() == "BinReady"){

		$h1.text("More");

	}else if( $h1.text() == "More") {

		$h1.text("BinReady");
		$("#container").show();
	}

	back();
}

// function to go back

function back(time) {

	$("ul li").fadeIn(time);
	$(".back").remove();
	$(".ditail").hide();
	$(".thisBack").removeClass("thisBack");

}

// voor klok animatie

function clockAni() {

	var random = Math.floor(Math.random()*$(".select").length);

	$(".select").eq(random).transition({
		 	perspective: "100px",
			rotateX: "360deg",
			rotateY: "360deg"
	}, 500);
}

// voor stopwath te runnen

function increment() {
	if(running == 1){

		setTimeout(function(){
			time = time + 1;
			var tenths = (time % 10).toString(),
				secs = Math.floor(time/10 % 60),
				mins = Math.floor(time/10/60 % 60),
				hours = Math.floor(time/10/60/60);

			if (hours < 10){
				hours = "0" +  hours;
			}
			if (mins < 10){
				mins = "0" + mins;
			}
			if (secs < 10){
				secs = "0" + secs;
			}


			$("#lapextra").text(hours + ':' + mins + ':' + secs + ':' + tenths);

			// error meer dan 24 uur

			if(time >= 864000){
				time = 0;
				running = 0;

				$("#startPause").text("reload");

				alertify.alert("You can't go dan more of 24 houres");

			}
			
			//json
			
			var url = ["t", "s", "m", "h"],
				eenh = [tenths.toString(), secs.toString(), mins.toString(), hours.toString()];

			for( var i = 0; i < eenh.length; i = i + 1){

				getjson(url[i], eenh[i]);
			
			}

			$(".select").removeClass("select");

			increment();
		
		}, 100);
	}
}

// to get the json

function getjson(url, get){
	$.getJSON("json/"+ url + ".json", function(data){

		var element = data[get];
				
		if(element == data[get]){
			$(element).addClass("select");
		}
	});
}

!function(){for(var a,b=function(){},c=["assert","clear","count","debug","dir","dirxml","error","exception","group","groupCollapsed","groupEnd","info","log","markTimeline","profile","profileEnd","table","time","timeEnd","timeline","timelineEnd","timeStamp","trace","warn"],d=c.length,e=window.console=window.console||{};d--;)a=c[d],e[a]||(e[a]=b)}();
