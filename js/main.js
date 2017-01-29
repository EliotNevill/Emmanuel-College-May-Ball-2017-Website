$(function() {
	$('a[href*=\\#]').on('click', function(e) {
		e.preventDefault();
		$('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear');
	});
});
function adjust(){
	 var documentWidth = $(document).width(); //retrieve current document width
var documentHeight = $(document).height(); //retrieve current document height
if(documentWidth < 1000){
	$('#aboutsection').css("zoom",documentWidth/1000);
}


if(documentWidth < 850){
	$('#ticketssection').css("zoom",documentWidth/850);
}
if(documentWidth < 1000){
	$('#worksection').css("zoom",documentWidth/1000);
}
if(documentWidth < 900){
	$('#committesection').css("zoom",documentWidth/900);
}

$("#video > div").css("zoom", $("#video").width() /650)
var theshratio = 2.1;
if((documentWidth / documentHeight) > theshratio){

	$('#aboutsection').css("zoom",(documentHeight / documentWidth) * theshratio);
	$('#ticketssection').css("zoom",(documentHeight / documentWidth) * theshratio);
	$('#worksection').css("zoom",(documentHeight / documentWidth) * theshratio);
	$('#committesection').css("zoom",(documentHeight / documentWidth) * theshratio);
}



}


$( window ).resize(function() {
	
var documentWidth = $(document).width(); //retrieve current document width
var documentHeight = $(document).height();
var c = $("#canvas");
var ctx = c[0].getContext('2d');
var w = ctx.canvas.width;
var h = ctx.canvas.height;
var zoom = (documentWidth / w) > (documentHeight /h ) ? (documentWidth / w) : (documentHeight /h );
if(documentWidth > 500){
	$("#canvas").css("zoom", zoom);
	$("#canvas").css("-webkit-transform", "translate("+(-zoom*ctx.canvas.width)+" , "+ (-zoom*ctx.canvas.height)+ ")");
}
adjust();
});


var launched = false;
function launch() {
	if(!launched){
		app.Splatter();
		app.setRand(true);
		$( "#launch_button" ).fadeOut();
		$( "#title" ).fadeOut();
		$("#tagline").fadeIn();
		$(".arrow-down").fadeIn();
		launched = true;
	}
}
var app;
$(document).ready(function() {

	adjust();
	app = new OilPainting();
	app.initialize();
	

	$('#fullpage').fullpage({
		paddingTop: '70px',
		paddingBottom: '20px',
		responsiveWidth: 550,
		anchors:['', 'about','tickets','work','comittee'],
		verticalCentered: false,

		onLeave: function(index, nextIndex, direction){
			app.Splatter();
			var leavingSection = $(this);





            //after leaving section 2
            if(index == 2 && direction =='up'){
            	$("#header").removeClass("slidedown").addClass("slideup");
            	$('#canvas').css("opacity",1);
            }
            if(index == 1 && direction =='down'){
            	$('#canvas').css("opacity",0.5);
            	$("#header").removeClass("slideup").addClass("slidedown");
            	$( "#launch_button" ).fadeOut();
            	app.setRand(true);

            }

            
            $("#header ul li").eq(index-2).css("background-color","white");
            if(nextIndex-2 >= 0){
            	$("#header ul li").eq(nextIndex-2).css("height","70px");
            	$("#header ul li").eq(nextIndex-2).css("background-color",app.getColour());
            }
            $("#header ul li").eq(index-2).css("height","50px");


        },


        afterLoad: function(anchorLink, index){
        	if(index != 1 && !launched){
        		launch();
        	}



        }
    });
});
$( "#launch_button" ).mouseover(
	function() {
		launch();
	}


	);

$( ".arrow-down" ).click(
	function(){

		$.fn.fullpage.moveSectionDown();
	}
	);
$( ".header ul li" ).click(
	function(){

		$.fn.fullpage.moveTo($(this).index()+2);
	}
	);


