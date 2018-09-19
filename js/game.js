//background music 
var audio = new Audio('Thang.mp3');
var prev_counter = 0;
var counter = 0;
var monstersCaught = 0;
var livesLeft = 3;
var shield = false;
var blaster = false;
var shieldcost = 5;
var lifecost = 4;
var blastercost =3;
paused = false;
mincost = 1;
maxcost =5;

//Initialize variables 
var multiplier = 1;
var gameStart = false;

//esc and music keys 
 document.addEventListener('keydown', function(event) {
	//Enter pressed 
	var key = event.keyCode;
    if(key== 27) {
		Return();
	}
	//m key pressed to turn music on and off 
    if(key == 77) {
       	playMusic(audio);
	}
	if (key == 87) { // Player presses w
		buyitem(shieldcost,shieldImage,extraLives);
	}
	if (key ==81) { // Player pressed q
		buyitem(lifecost,heartImage,extraLives);
		console.log("buying life");
	}
	if (key ==69) { // Player pressed e
		buyitem(blastercost,bulletImg,extraLives);
		console.log("buying gun");
	}
	if (key === 80)// p key
	{
		togglePause();
	}
	if (key === 13)// Enter
	{
		console.log("Enter");
		document.location.reload();
	}
	
});

function buyitem(cost,image,list){
	if(blaster){
		blaster = false;
	}
	if(shield){
		shield = false;
	}
	if(monstersCaught >= cost){
	   monstersCaught = monstersCaught - cost;
	   var item = new obj(50,69,1,3,image);
	   list.push(item);
	}
	else{
		console.log("MUST CATCH MORE");
	}
   
 }


function changeCost(){
	shieldcost = Math.floor((Math.random() * maxcost) + mincost);
	lifecost = Math.floor((Math.random() * maxcost) + mincost);
	blastercost = Math.floor((Math.random() * maxcost) + mincost);

	document.getElementById("lifecost").innerHTML = lifecost + "memes";
 }

 function chnageInnerHtml(id,newText){
	document.getElementById(id).innerHTML = newText;
 }

//get highscore and play music
function setUp() {
	storeHighScore();
	playMusic(audio);
}

function storeHighScore() {
	//if local storage supported 
    if(typeof(Storage) !== "undefined") {
		var highscore = sessionStorage.getItem("highscore");
        if (highscore != null) {
            if (monstersCaught > highscore) {
				sessionStorage.setItem("highscore", monstersCaught);      
			}
        } else {
			sessionStorage.setItem("highscore", monstersCaught);
        }
        document.getElementById("HighScore").innerHTML = "High Score: " + sessionStorage.getItem("highscore");
    } else {
        document.getElementById("HighScore").innerHTML = "Sorry, no storage";
    }
}

// The main game loop
var main = function () {
	//only if player presses play 
	if (gameStart) {
		var now = Date.now();
	var delta = now - then;
	if(!paused){
		update(delta / 1000);
		render();
			//check if we should generate more objects to make harder
		checktoGenerate(delta);
		//make objects move around 
		drawMovement(memes);
		drawMovement(holes);
		drawMovement(extraLives);
	}
	then = now;
	requestAnimationFrame(main);

	}
};

//pause and play background music 
var playMusic = function(audio){
	
	if(!audio.paused && !audio.ended) {
        audio.pause();
    }
    else if (audio.paused) {
        audio.play();
    }

}

//Hide Menu and Start game 
 var startButton= document.getElementById("startBtn");
startButton.onclick = function () {
	startGame();
};

//Show Instructions 
var HowtoPlay= document.getElementById("HowTo");
HowtoPlay.onclick = function () {
	hideElement("overlay");
	HowtoPlay.disabled = true;
	HowtoPlay.value= "Return";
	 // Create the canvas
	 hideElement("Instructions");
}

//Return to main menu
var Return= document.getElementById("Instructions");
Return.onclick = function () {
    document.location.reload();
};

//Create Images 
var bulletsReady = false;
var bulletImg = new Image();
bulletImg.src = "images/blaster.png";
bulletImg.onload = function () {
	bulletsReady = true;
};

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// Background image
var bgReady1 = false;
var bgImage1 = new Image();
bgImage1.onload = function () {
	bgReady1 = true;
};
bgImage1.src = "images/background.png";
                                           
// Background image
var bgReady2 = false;
var bgImage2 = new Image();
bgImage2.onload = function () {
	bgReady2 = true;
};
bgImage2.src = "images/background.png";

// Extra lives 	
var heartReady = false;
var heartImage = new Image();
heartImage.onload = function () {
	heartReady = true;
};
heartImage.src = "images/heart.png";

// doge image
var dogeReady = false;
var dogeImage = new Image();
dogeImage.onload = function () {
	dogeReady = true;
};
dogeImage.src = "images/doge.png";


// shield image
var shieldReady = false;
var shieldImage = new Image();
shieldImage.onload = function () {
	shieldReady = true;
};
shieldImage.src = "images/shield.png";

// Meme image
var memeReady = false;
var memeImage = new Image();
memeImage.onload = function () {
	memeReady = true;
	
};
memeImage.src = "images/monster.png";

//Blackhole Image 
var blackholeReady = false;
var blackholeImage = new Image();
blackholeImage.onload = function () {
	blackholeReady = true;
};
blackholeImage.src = "images/blackhole.png";

 // Create the canvas based on auto dimensions 
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;
document.body.appendChild(canvas);

var livesHeader = document.createElement("h3");
canvas.appendChild(livesHeader);
var node = document.createTextNode("Lives:");
livesHeader.appendChild(node);

bw = canvas.width;
bh = canvas.height;
p = 10;

function drawBoard(){
	for (var x = 0; x <= bw; x += 40) {
		ctx.moveTo(0.5 + x + p, p);
		ctx.lineTo(0.5 + x + p, bh + p);
	}
	
	
	for (var x = 0; x <= bh; x += 40) {
		ctx.moveTo(p, 0.5 + x + p);
		ctx.lineTo(bw + p, 0.5 + x + p);
	}
	
	ctx.strokeStyle = "#0000FF";
	ctx.stroke();
	}
	

//x and y are coordinates, speed is the speed determined by FPS
//use movement to determine which way the player goes
var meme = function(x,y,speed,movement){
	this.x =x;
	this.y = y;

	this.speed = speed;
	this.movement = movement;
	this.draw = function(){
        ctx.drawImage(bulletImg,this.x,this.y,this.w,this.h);
	}

	// this.update = function(){
	// 	this.y -= this.speed;
	// 	if(this.y<=0){
	// 		this.state = "inactive"
	// 	}
	// }
}


var obj = function(x,y,speed,movement,img){
	this.x =x;
	this.y = y;
	this.img = img;

	this.speed = speed;
	this.movement = movement;
	// this.draw = function(){
    //     ctx.drawImage(img,this.x,this.y,this.w,this.h);
	// }
}
var hole = function(x,y,speed, active){
	this.x =x;
	this.y = y;
	this.speed = speed;
	this.active =active;
}

//doge object is different from the memes
doge = {
	x : 300,
	y : 50,
	w : 50,
	h : 50,
	speed : 256,
	bullets : [],
	
	shoot : function(){
		console.log("Shooting a bullet");

		if(counter-prev_counter>=0){

			var b = new bullet(this.x + (this.w)/2, this.y,10);
			this.bullets.push(b);
			prev_counter = counter;

			holes.forEach(function(hole){

				//if(isColliding(this.bullets[this.bullets.length()-1],enemy)){
				if(isCollidingWithBullet(b,hole)){
					this.state = "inactive";
					var index = holes.indexOf(hole);
					holes.splice(index,1);
					}
				});

		}
		
	}

};



function isCollidingWithBullet(a,b){
		return !(
			((a.y + a.h) < (b.y)) ||
			(a.y > (b.y + 102)) ||
			((a.x + a.w) < b.x) ||
			(a.x > (b.x + 102))
		);
}

// //create first game objects 
// var doge = new meme(100,256,256,9);

// Class defined for a bullet
function bullet(x,y,speed){
	this.x = x;
	this.y = y;
	this.w = 20;
	this.h = 60;
	this.state = "active"
	this.speed = speed;

	this.draw = function(){
        ctx.drawImage(bulletImg,this.x,this.y-doge.w,this.w,this.h);
	}

	this.update = function(){
	 	this.y -= this.speed;
		if(this.y<=0){
			this.state = "inactive"
		}
	}

}

//initialize some objects 
var monster = new meme(100,256,1,3);
var extralife = new obj(100,256,1,3,heartImage);
var shield = new obj(50,69,1,3,shieldImage);

var monster2 = new meme(10,252,0.3,3);
//blackhole object can behave like a meme object
var blackhole = new meme(10,252,1,0);

//put objects in list for easy manipulation
var extraLives = [extralife,shield];
var holes = [blackhole];
var memes=[monster, monster2];

// Handle keyboard controls
var keysDown = {};
addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset game when the doge catches a meme
var reset = function () {
	doge.x = canvas.width / 2;
	doge.y = canvas.height / 2;

	randomPlacement(memes);
	randomPlacement(holes);
};

//remove item from array
var removeItem = function (array, index){
	if (index !== -1) array.splice(index, 1);
}

// Reset when the doge catches a meme
var clearMeme = function (z) {
	memes[z].x = 32 + (Math.random() * (canvas.width - 64));
	memes[z].y = 32 + (Math.random() * (canvas.height - 64));
};

//randomly place object meme
var randomPlacement = function(memes){
	for(var i=0;i<memes.length;i++){
		memes[i].x = 32 + (Math.random() * (canvas.width - 64));
		memes[i].y = 32 + (Math.random() * (canvas.height - 64));
	  }
}

nowGenerate = 0;
maxMemes = 10;
//see if we should make the game harder
var checktoGenerate = function(time){
	if(nowGenerate > 100){
		if(0<monstersCaught<20){
			changeCost();
			if(memes.length < maxMemes){
			generateMemes(holes,1);
			generateMemes(memes,2);
			}
		}
		if(20<monstersCaught<30){
			generateMemes(holes,2);
			//give doge ability to shoot 
			canshoot = true; 
		}
		//make it impossible after 30 lol 
		else{
			generateMemes(holes,2);
		}
	nowGenerate = 0;
	}
	nowGenerate += 1;
}

// Get the modal
var modal = document.getElementById('myModal');

modal.addEventListener('keydown', function(event) {
	//Enter pressed 
    if(event.keyCode == 13) {
		Return();
	}
});

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var sadDoge = document.getElementsByClassName("sadDoge");

sadDoge.onclick = function(event) {
    if (event.target == modal) {
		modal.style.display = "none";
		document.location.reload();
}
}

//generate more memes randomly 
var generateMemes= function (holes,speedIn) {
	newmeme = new meme(Math.floor(Math.random() * canvas.width),Math.floor(Math.random() * canvas.height),Math.floor(Math.random() * speedIn) +1,Math.floor(Math.random() * 4));
	//check that object doesn't collide with doge when initialized
	if (collideswith(doge,newmeme)){
		//create another if it does
	generateMemes(holes);
	}
	if (checkAllCollisions(newmeme,memes)){
		//create another if it does
	generateMemes(holes);
	}
	else{holes.push(newmeme)}
};

//random function from range 0 to
var rand = function(x){
	x = Math.floor(Math.random() * x);
}

//check if gameobject going off the canvas
//if so, make it come back onto canvas
var offScreen= function (meme,canvas) {
	if (meme.x < 0) {
		meme.x = canvas.width ;
	  }
	  else if (meme.x >= canvas.width) {
		  meme.x = 0;
	  }
	  if (meme.y < 0) {
		  meme.y = canvas.height;
	  }
	  else if (meme.y >= canvas.height) {
		  meme.y = 0;
	  }
  
};


//give objects motion in directions based on their movement attribute (#0-4)
var drawMovement = function(memes){
	for(var i=0;i<memes.length;i++){
		//move forwards to the bottom right 
		if(	memes[i].movement == 0){
			memes[i].x += memes[i].speed;
			memes[i].y += memes[i].speed;
		}
		//move backwards to the top left 
		if(	memes[i].movement == 1){
			memes[i].x -= memes[i].speed;
			memes[i].y -= memes[i].speed;
		}
		//move forwards to the top right
		if(	memes[i].movement == 2){
			memes[i].x += memes[i].speed;
			memes[i].y -= memes[i].speed;
		}
		//move backwards to the bottom left 
		if(	memes[i].movement == 3){
			memes[i].x -= memes[i].speed;
			memes[i].y += memes[i].speed;
		}
	  }
};

// Update game objects
var update = function (modifier) {

	if (38 in keysDown) { // Player holding up
		doge.y -= doge.speed * modifier;
	}
	if (40 in keysDown) { // Player holding down
		doge.y += doge.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
		doge.x -= doge.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		doge.x += doge.speed * modifier;
	}
	if (32 in keysDown) { // Player pressed space 
		if(blaster){
			doge.shoot();
		}
	}


	offScreen(doge,canvas);

	for(var i=0;i<memes.length;i++){
		offScreen(memes[i],canvas);
		ctx.drawImage(memeImage, memes[i].x, memes[i].y);
	  }

	  for(var i=0;i<holes.length;i++){
		offScreen(holes[i],canvas);
		ctx.drawImage(blackholeImage, holes[i].x, holes[i].y);
	  }
	  for(var i=0;i<extraLives.length;i++){
		offScreen(extraLives[i],canvas);
		ctx.drawImage(extraLives[i].img, extraLives[i].x, extraLives[i].y,10,10);
	  }

	  checkCollisions();

	  doge.bullets.forEach(function(bullet){
		bullet.update();

	});

};

function drawCircle(x,y,radius, width){
	ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, true); // Outer circle
	ctx.moveTo(110, 75);
	ctx.lineWidth = width;
	ctx.strokeStyle="#0000FF";
	ctx.stroke();
}

function clearCircle( x , y , r ){
    for( var i = 0 ; i < Math.round( Math.PI * r ) ; i++ ){
        var angle = ( i / Math.round( Math.PI * r )) * 360;
        ctx.clearRect( x , y , Math.sin( angle * ( Math.PI / 180 )) * r , Math.cos( angle * ( Math.PI / 180 )) * r );
    }
}

 function checkCollisions(){
	for(var i=0;i<memes.length;i++){
		// Did the doge catch a meme?
		if (collideswith(doge,memes[i])
	) {
		++monstersCaught;
		clearMeme(i);
		multiplier += 1;
	}
	
  }

  for(var i=0;i<holes.length;i++){
	if (collideswith(doge,holes[i])
) {
	if(shield){
		console.log("SHIELD ON");
		clearCircle(doge.x+32,doge.y+32,32,8);
		shield = false;
	}
	else{
		loseLife();
	}
	removeItem(holes,i);
}
  }
  for(var i=0;i<extraLives.length;i++){
	if (collideswith(doge,extraLives[i])
) {
	if(extraLives[i].img == heartImage){
		livesLeft ++;
	}
	if(extraLives[i].img == shieldImage){
		shield =true;
	}
	else{
		blaster =true;
	}
	removeItem(extraLives,i);
}
  }
 }

 //check if any collisions between objects- for generating 
 function checkAllCollisions(object,memes){
	for(var i=0;i<memes.length;i++){
		// Did the doge catch a meme?
		if (collideswith(object,memes[i])
	) {return true}
		else{
			return false;
		}
 }
}

//algorithm to see if two objects collide 
  function collideswith(d, b) {
	return d.x <= (b.x + 32)
	&& b.x <= (d.x + 32)
	&& d.y <= (b.y + 32)
	&& b.y <= (d.y + 32)
  }

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (dogeReady) {
		ctx.drawImage(dogeImage, doge.x, doge.y);
	}

	//easier to call function for rendering multiple objects of same type
	renderMultipleObjects(memeReady,memeImage,memes,memeImage.width,memeImage.height)
	renderMultipleObjects(blackholeReady,blackholeImage,holes,blackholeImage.width,blackholeImage.height)
	renderMultipleObjectswithImage(heartReady,extraLives,40,40)

		//Drawing the bullets
	doge.bullets.forEach(function(bullet){
			bullet.draw();
		});
	if (shield){
		drawCircle(doge.x+32,doge.y+32,32,8);
	}
	counter ++;

	};

	var renderMultipleObjects = function(ifReady, Image, list,w,h){
		if (ifReady) {
			for(var i=0;i<list.length;i++){
				ctx.drawImage(Image, list[i].x, list[i].y,w,h);
			  }
		};

		displayScore(monstersCaught);
		displayLives(livesLeft);
		storeHighScore();
};

var renderMultipleObjectswithImage = function(ifReady, list,w,h){
	if (ifReady) {
		for(var i=0;i<list.length;i++){
			ctx.drawImage(list[i].img, list[i].x, list[i].y,w,h);
		  }
		}
	};

// Define some functions for clean code

//Function for displaying and hiding elements 
function hideElement(name) {
    var x = document.getElementById(name);
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

var resetGame = function(){
	modal.style.display = "none";
	document.location.reload();
}

//lose game
var loseLife= function () {
	if(livesLeft == 0){
	//display lose screen
	document.getElementById("score").innerHTML = "Memes Caught: " + monstersCaught;
	modal.style.display = "block";
	//get rid of doge since he is in a blackhole
	dogeReady = false;
	}
	else{
		livesLeft--;
	}
};

var halveImage = function(img){
	img.width = img.width/2;
	img.height = img.height/2;
}

//start game
var startGame= function () {
	gameStart = true;
	hideElement("startBtn");
	hideElement("welcome");
	drawBoard();
	main();
};	

function togglePause()
{
    if (!paused)
    {
        paused = true;
    } else if (paused)
    {
       paused= false;
    }

}

//display score
var displayScore= function (monstersCaught) {
    // Display Score 
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Roboto";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	//ctx.fillText("Memes caught: " + memes[1].speed, 32, 32);
	ctx.fillText("Memes caught: " + monstersCaught, 32, 32);
};

//display score
var displayLives= function () {
    // Display lives left
	ctx.fillText("Lives: " + livesLeft, window.innerWidth - 180, 32);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();
