// JavaScript
// Globala variabler
var startGameBtn;		//Referens till start-knappen (button)
var nextButton;         //Referens till nästa-knappen (button)
var picsElems;          //Referens till alla bildelement 

// Initiera globala variabler och koppla funktion till knapp
function init() {
    startGameBtn=document.getElementById("startGameBtn");
    nextButton=document.getElementById("nextBtn");
    picsElems=document.getElementById("bricks").getElementsByTagName("img");
    addListener(startGameBtn,"click", startGame);
    addListener(nextButton,"click", ceckPick);

} //End init
addListener(window,"load",init); // Se till att init aktiveras då sidan är inladdad

//Funktion för att initiera spel
function startGame() {
updateTiles(); //Anropa funktionen för att slumpa bilderna till varje bricka


} //End startGame

function updateTiles() {

}

function getPictures() {

} //End getPicture

function checkPick() {

} //End checkPick

