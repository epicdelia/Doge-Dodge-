
//get highscore and play music
function setUp() {
    //Create Images 
var bulletsReady = false;
var bulletImg = new Image();
bulletImg.src = "images/bullet.png";
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

	storeHighScore();
	playMusic(audio);
}