//background music 
var audio = new Audio('Thang.mp3');

//Initialize variables 
var multiplier = 1;
var gameStart = false;

//esc and music keys 
 document.addEventListener('keydown', function(event) {
	//Enter pressed 
    if(event.keyCode == 27) {
		endGame();
	}
	//m key pressed to turn music on and off 
    if(event.keyCode == 77) {
       	playMusic(audio);
    }
});

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
	update(delta / 1000);
	render();
	then = now;
	requestAnimationFrame(main);	

	//check if we should generate more objects to make harder
	checktoGenerate(delta);
	//make objects move around 
	drawMovement(memes);
	drawMovement(holes);
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

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// doge image
var dogeReady = false;
var dogeImage = new Image();
dogeImage.onload = function () {
	dogeReady = true;
};
dogeImage.src = "images/doge.png";

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

//x and y are coordinates, speed is the speed determined by FPS
//use movement to determine which way the player goes
var meme = function(x,y,speed,movement){
	this.x =x;
	this.y = y;
	this.speed = speed;
	this.movement = movement;

}
//create first game objects 
var doge = new meme(100,256,256,9);
var monster = new meme(100,256,1,3);
var monster2 = new meme(10,252,0.3,3);

//blackhole object can behave like a meme object
var blackhole = new meme(10,252,0.3,0);
var monstersCaught = 0;
//put objects in list for easy manipulation
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

// Reset the game when the doge catches a meme
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
			if(memes.length < maxMemes){
			generateMemes(holes,1);
			generateMemes(memes,2);
			}
		}
		if(20<monstersCaught<30){
			generateMemes(holes,2);
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
		endGame();
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
	offScreen(doge,canvas);

	for(var i=0;i<memes.length;i++){
		offScreen(memes[i],canvas);
	  }

	  for(var i=0;i<holes.length;i++){
		offScreen(holes[i],canvas);
	  }

	  for(var i=0;i<holes.length;i++){
		ctx.drawImage(blackholeImage, holes[i].x, holes[i].y);
	  }

	for(var i=0;i<memes.length;i++){
		ctx.drawImage(memeImage, memes[i].x, memes[i].y);
	  }

	  checkCollisions();
};

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
	document.getElementById("score").innerHTML = "Memes Caught: " + monstersCaught;
	endGame();
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
	renderMultipleObjects(memeReady,memeImage,memes)
	renderMultipleObjects(blackholeReady,blackholeImage,holes)

	};

	var renderMultipleObjects = function(ifReady, Image, list){
		if (ifReady) {
			for(var i=0;i<list.length;i++){
				ctx.drawImage(Image, list[i].x, list[i].y);
			  }
		};

		displayScore(monstersCaught);
		storeHighScore();
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
var endGame= function () {
	//display lose screen
	modal.style.display = "block";
	//get rid of doge since he is in a blackhole
	dogeReady = false;
};

//start game
var startGame= function () {
	gameStart = true;
	hideElement("startBtn");
	hideElement("welcome");
	main();
};	

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

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();
