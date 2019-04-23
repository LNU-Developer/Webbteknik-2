// JavaScript Document

// Globala variabler
var boxElems;		// Array med referenser till boxarna
var dragBoxElem;	// Referens till den box man drar
var deltaX, deltaY;	// Skillnad mellan boxens koordinater (left,top) och skärmens koordinater för muspekaren
var infoElem;		// Referens till elementet för info då en box dras

// Initiera globala variabler och koppla funktion till knapp
function init() {
	initBoxes();
	getBoxCookie();
} // End init
addListener(window,"load",init);
addListener(window, "unload", saveBoxCookie);

function saveBoxCookie() {
	var i,l,t, cookieValue;
	cookieValue="";
	for(i=0; i<boxElems.length;i++) {
		t=parseInt(boxElems[i].style.top);
		l=parseInt(boxElems[i].style.left);
		cookieValue+="#"+l+","+t;
	}
	cookieValue=cookieValue.substring(1);
	setCookie("boxpos", cookieValue);
}

function getBoxCookie() {
	var i, cookieValue, cookieArr, posArr;
	cookieValue=getCookie("boxpos");
	if (cookieValue!=null) {
		cookieArr = cookieValue.split("#");
		for (i=0; i<cookieArr.length; i++) {
			posArr = cookieArr[i].split(",");
			boxElems[i].style.left=posArr[0] + "px";
			boxElems[i].style.top=posArr[1] + "px";
		}
	} else {
		getCookie(null);
	}
}


// ----------- Kod för boxarna -------------

// Initiera boxarnas placering och händelser frö att kunna dra dem.
function initBoxes() {
	var i;				// Loopvariabel
	var boxAreaElem;	// Referens till elementet som omger boxarna
	boxAreaElem = document.getElementById("boxes");
	boxElems = boxAreaElem.getElementsByTagName("div");
	for (i=0; i<boxElems.length; i++) {
		boxElems[i].style.top = "10px";
		boxElems[i].style.left = (10+40*i) + "px";
		boxElems[i].draggable = true;
		addListener(boxElems[i],"dragstart",dragStarted);
		addListener(boxElems[i],"dragend",dragEnded);
	}
	addListener(boxAreaElem,"dragover",boxDropped);
	addListener(boxAreaElem,"drop",boxDropped);
	infoElem = document.getElementById("info");
} // End initBoxes

// En box börjar dras.
function dragStarted(e) {
	e.dataTransfer.setData("text","dummy");
		// Ingenting behöver sparas i programmet, men denna rad måste ändå vara med, för att det ska fungera i alla webbläsare
	dragBoxElem = this; // Spara referens till den box som användaren drar
	deltaX = e.screenX - parseInt(dragBoxElem.style.left);
	deltaY = e.screenY - parseInt(dragBoxElem.style.top);
} // End dragStarted

// Hantera händelserna dragover och drop
// Endast drop används i detta exempel
function boxDropped(e) {
	var x, y;	// Nya koordinater för boxen
	e.preventDefault();
	if (e.type == "dragover") { // Skriv ut koordinater
		infoElem.innerHTML = (e.screenX - deltaX) + "," + (e.screenY - deltaY);
	}
	else if (e.type == "drop") {
		x = e.screenX - deltaX;
		y = e.screenY - deltaY;
		if (x > 0 && x < 565 && y > 0 && y < 365) { // Om boxen ryms inom den vita ytan,
			dragBoxElem.style.left = x + "px";		// så flytta den.
			dragBoxElem.style.top = y + "px";
		}
	}
} // End boxDropped

// Draghändelsen har avslutats (oavsett om det är över eller utanför boxarnas yta)
function dragEnded() {
	infoElem.innerHTML = "";
} // End dragEnded