// JavaScript

// Globala variabler
var wordList; //Array med ett antal ord, där man sedan väljer ett slumpmässigt.
var selectedWord; //Det ord som valts slumpmässigt och som användaren ska gissa på.
var letterBoxes; //Array med referenser till de span-taggar som utgör rutor för bokstäverna i ordet.
var hangmanImg; //Referens till img-elementet med bilden för galgen och gubben.
var hangmanImgNr; //Nummer för aktuell bil (0-6), för den bildfil som visas (så man sedan kan veta vilket som blir nästa bild).
var msgElem; //Referens till div-elementet för meddelanden.
var startGameBtn //referens till startknapp
var letterButtons; // Array with references to the letter buttons
var startTime; //Variabel för att hålla reda på starttiden.

// Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd
// Initiering av globala variabler samt koppling av funktioner till knapparna.
function init() {
	wordList = ["BLOMMA","LASTBIL","SOPTUNNA","KÖKSBORD","RADIOAPPARAT","VINTER","SOMMAR","DATORMUS","LEJON","ELEFANTÖRA","JULTOMTE",
				"SKOGSHYDDA","BILNUMMER","BLYERTSPENNA","SUDDGUMMI","KLÄDSKÅP","VEDSPIS","LJUSSTAKE","SKRIVBORD","ELDGAFFEL","STEKPANNA",
				"KASTRULL","KAFFEBRYGGARE","TALLRIK","SOFFBORD","TRASMATTA","FLYGPLAN","FLYGPLATS","TANGENTBORD"];
	var i; //Variabel för forsats
	startGameBtn = document.getElementById("startGameBtn");
	letterButtons = document.getElementById("letterButtons").getElementsByTagName("button");
	
	for (i=0; i<letterButtons.length; i++) 
		letterButtons[i].onclick=guessLetter; //vid varje klick av en knapp skall funktionen Guessletter köras.
	
	hangmanImg = document.getElementById("hangman");
	msgElem = document.getElementById("message");
	document.getElementById("startGameBtn").onclick=startGame;
	changeButtonActivation(false);
} // End init
window.onload = init; // Se till att init aktiveras då sidan är inladdad.

//Funktion som Anropas då man klickar på knappen "Starta spelet".
//Väljer ord slumpmässigt.
//Visar bokstavsrutor.
//Visar första bilden, h0.png.
//Lägger startdatum/tid i en variabel
function startGame() {
var now; //variabel för att ange datum
randomWord();
showLetterBoxes();
hangmanImg.src = "pics/h0.png"
hangmanImgNr=0;
changeButtonActivation(true);
msgElem.innerHTML=""
now = new Date();
startTime = now.getTime();
}

//Ta fram ett slumptal mellan 0 och antal ord i en lista av ord.
//Indexerar listan med slumptalet och spara valt ord i en global variabel.
//Kontrollerar om ett ord redan valts rundan innan
function randomWord() {
	var wordIndex, oldWord; //variabel för att kolla om ett ord har används i rundan tidigare
	oldWord=selectedWord;
	while(oldWord==selectedWord) {
		wordIndex = Math.floor((Math.random() *28) + 0);
		selectedWord = wordList[wordIndex];
	}	
}

//Går igenom valt ord och skapa en kod med eP span-element för varje bokstav.
//Lägger in koden i elementet med id "lePerBoxes".
function showLetterBoxes() {
	var newCode=""; //variabel för att ange antalet boxar i HTML 
	var i; //variabel för forsats

	for (i=0; i<selectedWord.length; i++) {
		newCode += "<span>&nbsp;</span>";
	}
	document.getElementById("letterBoxes").innerHTML = newCode;
	letterBoxes = document.getElementById("letterBoxes").getElementsByTagName("span");
}

//Anropas då man klickar på en bokstavsknapp.
//Avläser vald bokstav ur buPon-elementets value-attribut.
//Går igenom alla bokstäver i ordet och kontrollera om vald bokstav finns (kan finnas flera gånger i ordet). I så fall skrivs den in i motsvarande ruta.
//Om bokstaven ej finns, byts bilden till nästa bild.
//Om man då visar den sista bilden (h6.png), avslutas spelet med hängd gubbe.
//Annars kontrolleras om alla bokstäver är klara. I så fall avslutas spelet.
function guessLetter() {
	var letter, i, letterFound, correctLettersCount; //variabel letter för att ange knappens värde, letterFound som flagga om man hittat en bokstav, correctLettersCount för att hålla reda på antalet rätta bokstäver.
	letterFound = false;
	letter=this.value;
	this.disabled=true;
	correctLettersCount = 0;
	for (i=0; i<selectedWord.length; i++) {
		if (letter == selectedWord.charAt(i) ) {
		letterBoxes[i].innerHTML=letter;	
		letterFound=true;
		}			
		if(letterBoxes[i].innerHTML != "&nbsp;")
				correctLettersCount++;
	}
	if (!letterFound){
		hangmanImgNr++;
		hangmanImg.src = "pics/h"+hangmanImgNr+".png";
		if (hangmanImgNr==6){
			endGame(true);
		}
	}else if(correctLettersCount==selectedWord.length){
		endGame(false);
	}

}

//Parameter för att veta hur spelet slutade.
//Om gubben blev hängd, skrivs eP meddelande med det rätta ordet.
//Annars skrivs ett meddelande med en gratula&on.
//Jämför tid för avslut med klockslag vid start och skriver ut tiden det tog i sekunder.
function endGame(manHanged) {
	var now, runTime; //variabel now för att hålla reda på sluttiden, runtime för att se hur många sekunder ett spel tog.
	
	now = new Date();
	runTime=(now.getTime()-startTime)/1000;

	if (manHanged) {
		msgElem.innerHTML="Tyvärr, gubben hängdes! Det rätta ordet var "+selectedWord+". Bättre lycka nästa gång!";
	} else {
		msgElem.innerHTML="Grattis, du hittade ordet!"
	}
	changeButtonActivation(false);
	msgElem.innerHTML +="<br><br>"+"Det tog "+runTime.toFixed(1)+" sekunder."
}

//Funktion för att ändra så att antingen startknappen eller boksavsknapparna disablas/enablas
function changeButtonActivation(status) {
	if(status) {
		startGameBtn.disabled=true;
		for (i=0; i<letterButtons.length; i++)
			letterButtons[i].disabled = false;
	} else {
		startGameBtn.disabled=false;
		for (i=0; i<letterButtons.length; i++)
			letterButtons[i].disabled = true;
	}
}