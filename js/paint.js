// Oil Painting
// Ported from flash project - http://wonderfl.net/c/92Ul
//
//
function sleep_ (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
function sleep(ms) {
  sleep_(ms);
}


function OilPainting(){
  
  var canvas;
	var context;
	var intervalid;
	var width;
	var height;
	var counter = 0;
	var randSplat = false;

	var startPos = {x: window.innerWidth/2, y: window.innerHeight/2};
	var prevPos = {x: window.innerWidth/2, y: 0};
	var dist = {x: 0, y: 0};
	var colour = '#'+Math.floor(Math.random()*16777215).toString(16);
	
	
	this.initialize = function(){
		canvas  = document.getElementById("canvas");
		context = canvas.getContext('2d');
	
		width = window.innerWidth
		height = window.innerHeight
		
		canvas.width = width;
		canvas.height = height;

			colour = 'rgb(' + (Math.floor((256-100)*Math.random()) + 99) + ',' + 
                                    (Math.floor((256-100)*Math.random()) + 99) + ',' + 
                                    (Math.floor((256-100)*Math.random()) + 99) + ')';
		context.fillStyle = colour;
	    context.strokeStyle = colour;
		
		

		canvas.addEventListener('mousemove', MouseMove, false);
		canvas.addEventListener('click', MouseDown, false);
		canvas.addEventListener('dblclick', MouseDbl, false);	
	}
	this.setRand = function(bool){
		randSplat = bool;
	}
	this.getColour = function(){
		return colour;
	}
	var Splat = function(){


		maxdist = canvas.height * 2;
		maxrad = canvas.height / 10;
		for (i  = 0; i < (1+10*((nsplats - counter)/nsplats)|0); i++) {
			dis = Math.pow((Math.random() * maxdist),0.9);
   			 rad = maxrad * Math.pow(((maxdist - dis)/maxdist) , 10) ;
   			 
   			 ang = Math.random() * 2* Math.PI;
   			 x = Math.sin(ang) * dis;
   			 y = Math.cos(ang) * dis;
   			 context.beginPath();
   			 context.arc(centerx + x,centery + y,rad,0,2*Math.PI);
   			 context.stroke();
   			 context.fill();
   			 counter ++;
		}
		
   			 context.moveTo(startPos.x, startPos.y);
   			 context.closePath();

   			if(counter > nsplats){
   			 	clearInterval(intervalid);
   			 	intervalid = null;
   			 	
   			 }
		
	}

	this.Splatter = function(){
	colour = '#'+Math.floor(Math.random()*16777215).toString(16);
	colour = 'rgb(' + (Math.floor((256-100)*Math.random()) + 99) + ',' + 
                                    (Math.floor((256-100)*Math.random()) + 99) + ',' + 
                                    (Math.floor((256-100)*Math.random()) + 99) + ')';
	context.fillStyle = colour;
	context.strokeStyle = colour;

	if(!randSplat){
			centerx = canvas.width /2;
			centery = canvas.height/2;
	}else{
			centerx = canvas.width/2 + (Math.random()-0.5)*(canvas.width * 0.8)
			centery = canvas.height/2 + (Math.random()-0.5)*(canvas.height * 0.8)

	}
	counter = 0;
	nsplats = 1000;
	canvas  = document.getElementById("canvas");
	context = canvas.getContext('2d');
	intervalid = setInterval(Splat, 1);
	

   			 
		
	}
	var MouseMove = function(e) {
		var distance = Math.sqrt(Math.pow(prevPos.x - startPos.x, 2) +
								 Math.pow(prevPos.y - startPos.y, 2));
								 
		var a = distance * 10 * (Math.pow(Math.random(), 2) - 0.5);
		
		var r = Math.random() - 0.5;
		
		var size = (Math.random() * 15) / distance;
		
		dist.x = (prevPos.x - startPos.x) * Math.sin(0.5) + startPos.x;
		dist.y = (prevPos.y - startPos.y) * Math.cos(0.5) + startPos.y;
		
		startPos.x = prevPos.x;
		startPos.y = prevPos.y;
		
		prevPos.x = (e.layerX);
		prevPos.y = (e.layerY);
	   
	   // ------- Draw -------
	   var lWidth = (Math.random()+20/10-0.5)*size+(1-Math.random()+30/20-0.5)*size;
	   context.lineWidth = lWidth;
	   context.strokeWidth = lWidth;
	   
	   context.lineCap = 'round';
	    context.lineJoin = 'round';
	    
	   context.beginPath(); 
	   context.moveTo(startPos.x, startPos.y);
	   context.quadraticCurveTo(dist.x, dist.y, prevPos.x, prevPos.y);
	   
	   context.fillStyle = colour;
	   context.strokeStyle = colour;
	
	   context.moveTo(startPos.x + a, startPos.y + a);
	   context.lineTo(startPos.x + r + a, startPos.y + r + a);
	   
	   context.stroke();
	   context.fill();
	   
	   context.closePath();
	}
	
	var MouseDown = function(e) {
		e.preventDefault();
		colour = 'rgb(' + (Math.floor((256-100)*Math.random()) + 99) + ',' + 
                                    (Math.floor((256-100)*Math.random()) + 99) + ',' + 
                                    (Math.floor((256-100)*Math.random()) + 99) + ')';
	
	}
	
	var MouseDbl = function(e) {
		e.preventDefault();
		context.clearRect(0, 0, width, height);
	}

		
}


