// JavaScript Document

// Globala variabler
var carImgElem;		// Referens till bild med bil
var msgElem;		// Referens till elementet för meddelanden
var carImgs;		// Array med filnamn för bilderna med bilen
var carDir;			// Riktning för bilen
var xStep, yStep;	// Antal pixlar som bilen ska förflytta sig i x- resp. y-led i varje steg
var timerRef;		// Referens till timern för bilens förflyttning
var timerStep;		// Tid i ms mellan varje steg i förflyttningen
/* === Tillägg i labben === */
var pigImgElem; //Referera till bild med gris
var pigTimerRef; //Variabel för att hålla reda på tid en gris är synlig
var pigDuration; //Variabel för att ange hår lång tid det är emellan varje gris
var cSize; //variabel för att hålla reda på bilens storlek
var pSize; //variabel för att hålla reda på grisens storlek
var pigNr; //variabel för att hålla koll på vilken gris det är vid ett tillfälle
var hitCounter; //variabel för att hålla koll på hur många träffar man har
var pigNrElem; //variabel för att koppla samman med elementet i htmlkod
var hitCounterElem; //variabel för att koppla samman med elementet i htmlkod
var catchedPig; //variabel för att hantera om en gris redan är träffad eller ej
// Initiera globala variabler och koppla funktion till knapp
function init() {
	carImgElem = document.getElementById("car");
	msgElem = document.getElementById("message");
	addListener(document,"keydown",checkKey);
	carImgs = ["car_up.png","car_right.png","car_down.png","car_left.png"];
	carDir = 1;
	addListener(document.getElementById("startBtn"),"click",startGame);
	addListener(document.getElementById("stopBtn"),"click",stopGame);
	xStep = 5;
	yStep = 5;
	timerRef = null;
	timerStep = 20;
	/* === Tillägg i labben === */
	pigImgElem=document.getElementById("pig");
	pigTimerRef = null;
	pigDuration = 2000;
	cSize = 80;
	pSize = 40;
	pigNrElem = document.getElementById("pigNr");
	hitCounterElem = document.getElementById("hitCounter");
} // End init
addListener(window,"load",init);

function checkKey(e) {
	var k = e.keyCode; //byter bild efter vänster och högertangent
	switch (k) {
		case 37: // Pil vänster
		case 90: // Z
			carDir--;
			if (carDir < 0) carDir = 3;
			carImgElem.src = "pics/" + carImgs[carDir];
			break;
		case 39:  // Pil höger
		case 173: // -
			carDir++;
			if (carDir > 3) carDir = 0;
			carImgElem.src = "pics/" + carImgs[carDir];
			break;
	}
} // End checkKey

// Starta bilens rörelse
function startGame() {
	carImgElem.style.left = "0px";
	carImgElem.style.top = "0px";
	moveCar();
	/* === Tillägg i labben === */
	pigTimerRef=setTimeout(newPig, pigDuration);
	pigNr = 0;
	hitCounter = 0;
	catchedPig=true;
} // End startGame

// Stoppa bilen
function stopGame() {
	if (timerRef != null) clearTimeout(timerRef);
	/* === Tillägg i labben === */
	clearTimeout(pigTimerRef);
	pigImgElem.style.visibility="hidden";
} // End stopGame

// Flytta bilen ett steg framåt i bilens riktning
function moveCar() {
	var x;	// x-koordinat (left) för bilen
	var y;	// y-koordinat (top) för bilen
	x = parseInt(carImgElem.style.left);
	y = parseInt(carImgElem.style.top);
	switch (carDir) {
		case 0: // Uppåt
			y -= yStep;
			if (y < 0) y = 0;
			break;
		case 1: // Höger
			x += xStep;
			if (x > 720) x = 720;
			break;
		case 2: // Nedåt
			y += yStep;
			if (y > 420) y = 420;
			break;
		case 3: // Vänster
			x -= xStep;
			if (x < 0) x = 0;
			break;
	}
	carImgElem.style.left = x + "px";
	carImgElem.style.top = y + "px";
	timerRef = setTimeout(moveCar,timerStep);
	/* === Tillägg i labben === */
	checkHit();
} // End moveCar


/* === Tillägg av nya funktioner i labben === */
//Slumpar fram ny gris på nya positioner och uppdaterar positionen
function newPig() {
	if (pigNr<10) {
		var t = Math.floor(440*Math.random())+10; //random tal av höjd
		var l = Math.floor(740*Math.random())+10; //random tal av vänster
		pigImgElem.style.top = t+"px";
		pigImgElem.style.left = l+"px";
		pigImgElem.src="pics/pig.png";
		pigImgElem.style.visibility="visible";
		pigTimerRef=setTimeout(newPig, pigDuration);
		pigNr+=1; //lägger till 1 i variabeln
		pigNrElem.innerHTML=pigNr;
		catchedPig=false;	
	} else {
		stopGame();
	}
	
}
//funktion för att kontrollera om grisen träffats av bilen eller ej
function checkHit() {
var cT, cL, pT, pL; //variabler för att hålla koll på bildernas position på höjd och från vänster
pT = parseInt(pigImgElem.style.top);
pL = parseInt(pigImgElem.style.left);
cT = parseInt(carImgElem.style.top);
cL = parseInt(carImgElem.style.left);

if(catchedPig==true) {
	return;
}

if (cL+cSize-10 >= pL && cL+10<=pL+pSize && cT+cSize-10 >= pT && cT+10 <=pT+pSize) {
	clearTimeout(pigTimerRef);
	pigImgElem.src="pics/smack.png";
	pigTimerRef=setTimeout(newPig, pigDuration);
	hitCounter+=1;
	hitCounterElem.innerHTML =hitCounter;
	catchedPig=true;
}

}