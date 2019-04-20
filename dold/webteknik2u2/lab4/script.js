// JavaScript

// Globala variabler
// Ord och bilder
	var allPics;			// Array med alla ord
	var allDescription;		// Array med kort beskrivning av alla ord/bilder
	var picsIx4;			// Array med nummer (index till allPics) för de fyra bilder som ska visas
	var words8;				// Array med de åtta ord som ska finnas i listan (sorteras i bokstavsordning)
// Element i gränssnittet
	var startGameBtn;		// Referenser till start-knappen (button)
	var checkAnswersBtn;	// Referens till knappen för att kontrollera svar (button)
	var wordListElem;		// Referens till listan med de ord som kan dras (ul-elemntet)
	var	wordElems;			// Array med referenser till elementen för de åtta orden (li-elemnten)
	var picsElems;			// Array med referenser till elementen med de fyra bilderna (img)
	var userAnswerElems;	// Array med referenser till elementen för orden intill bilderna (span)
	var correctAnswerElems;	// Array med referenser till element för rätta svar (span)
	var largePictElem;		// Referens till elementet med den stora bilden (img)
	var msgElem; 			// Referens till div-element för utskrift av meddelanden (div)
// Element vid drag and drop
	var dragWordElem;		// Det ord som dras (kan vara både li och span)

// Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd.
// Initiering av globala variabler samt händelsehanterare.
function init() {
	var i;	// Loopvariabel
	// Ord och bilder
		picsIx4 = [];
		words8 = [];
		allPics = ["Borgholm","Gränna","Gävle","Göteborg","Halmstad","Jönköping","Kalmar","Karlskrona","Kiruna","Ljungby","Malmö","Norrköping","Skara","Stockholm","Sundsvall","Umeå","Visby","Västervik","Växjö","Örebro"];
		allDescription = [" - Kyrkan"," - Storgatan"," - Julbock"," - Operan"," - Picassoparken"," - Sofiakyrkan"," - Domkyrkan"," - Rosenbom"," - Stadshus"," - Garvaren"," - Stortorget"," - Spårvagn"," - Domkyrka"," - Rosenbad"," - Hotell Knaust"," - Storgatan"," - Stadsmur"," - Hamnen"," - Teater"," - Svampen"];
	// Referenser till element i gränssnittet
		startGameBtn = document.getElementById("startGameBtn");
		checkAnswersBtn = document.getElementById("checkAnswersBtn");
		wordListElem = document.getElementById("words").getElementsByTagName("ul")[0];
		wordElems = document.getElementById("words").getElementsByTagName("li");
		picsElems = document.getElementById("pics").getElementsByTagName("img");
		userAnswerElems = document.getElementsByClassName("userAnswer");
		correctAnswerElems = document.getElementsByClassName("correctAnswer");
		largePictElem = document.getElementById("largePict");
		msgElem = document.getElementById("message");

	// Lägg på händelsehanterare
		addListener(startGameBtn, "click", startGame);
		addListener(checkAnswersBtn, "click", checkAnswers);
		for (i=0; i<picsElems.length; i++) {
			addListener(picsElems[i], "mouseover", showLargePict);
			addListener(picsElems[i], "mouseout", hideLargePict);
		}

	// Aktivera/inaktivera knappar
	startGameBtn.disabled=false;
	checkAnswersBtn.disabled=true;

} // End init

addListener(window,"load",init); // Se till att init aktiveras då sidan är inladdad

// Initiera spelet. Välj ord slumpmässigt. Visa ord och bilder.
function startGame() {
	var r; //varibael för att ange ett slumpässigt tal
	var tempList = allPics.slice(0); //Variabel för att spara en ny lista att använda så vi inte får en dublett.

	for (i=0; i<4; i++) {
		r = Math.floor(tempList.length * Math.random());
		words8[i]=tempList[r];
		picsIx4[i]=allPics.indexOf(tempList[r]);
		tempList.splice(r,1);
	}
	for (i=4; i<8; i++) {
		r = Math.floor(tempList.length * Math.random());
		words8[i]=tempList[r];
		tempList.splice(r,1);
	}
	words8.sort();
	for (i=0; i < words8.length;i++){
		wordElems[i].innerHTML=words8[i];
	}
	for (i=0; i < picsIx4.length; i++){
		picsElems[i].src="pics/"+picsIx4[i]+".jpg";
		userAnswerElems[i].innerHTML="";
		correctAnswerElems[i].innerHTML="";
	}
	eventsForDrag(true);
	startGameBtn.disabled=true;
	checkAnswersBtn.disabled=false;

} // End startGame

// Lägg på eller ta bort händelsehanterare på de element som ska kunna dras
// samt händelsehanterare för element där man kan släppa orden (drop).
function eventsForDrag(drag) {
	var i; //loopvariabel
	if (drag) {
		for (i=0; i<wordElems.length; i++) {
			wordElems[i].draggable=true;
			addListener(wordElems[i], "dragstart", dragStarted);
		}
		for (i=0; i<picsElems.length; i++) {
			addListener(picsElems[i], "dragover", wordOverPict);
			addListener(picsElems[i], "drop", wordOverPict);
		}	
		for(i=0; i < picsIx4.length; i++){
			userAnswerElems[i].draggable=true;
			addListener(userAnswerElems[i], "dragstart", dragStarted);
		}	
		addListener(wordListElem, "dragover", wordOverList);
		addListener(wordListElem, "drop", wordOverList);	
	} 	else {
		for (i=0; i<wordElems.length; i++) {
			wordElems[i].draggable=false;
			removeListener(wordElems[i], "dragstart", dragStarted);
		}
		for (i=0; i<picsElems.length; i++) {
			removeListener(picsElems[i], "dragover", wordOverPict);
			removeListener(picsElems[i], "drop", wordOverPict);
		}	
		for(i=0; i < picsIx4.length; i++){
			userAnswerElems[i].draggable=false;
			removeListener(userAnswerElems[i], "dragstart", dragStarted);	
		}
		removeListener(wordListElem, "dragover", wordOverList);
		removeListener(wordListElem, "drop", wordOverList);
	}
} // End eventsForDrag

// Visa förstorad bild
function showLargePict() {
	largePictElem.src=this.src;
} // End showLargePict

// Dölj förstorad bild
function hideLargePict() {
	largePictElem.src="pics/empty.png";

} // End hideLargePict

// Ett ord börjar dras.
function dragStarted(e) {
	e.dataTransfer.setData("text", this.innerHTML);
	dragWordElem=this;
} // End dragStarted

// Hantera händelserna dragover och drop, då ett ord släpps över en bild
// Endast drop används i detta exempel
function wordOverPict(e) {
	var i; //loopvariabel
	e.preventDefault(); //kod för att förhindra webläsarens standardbeteende.
	if(e.type == "drop") {
		dragWordElem.innerHTML="";
		i=this.id;
		if(userAnswerElems[i].innerHTML!="") {
			moveBackToList(userAnswerElems[i].innerHTML);
		}
		userAnswerElems[i].innerHTML = e.dataTransfer.getData("text");
	}
} // End wordOverPict
// Hantera händelserna dragover och drop, då ett ord släpps över listan med ord
// Endast drop används i detta exempel
function wordOverList(e) {
	e.preventDefault(); //kod för att förhindra webläsarens standardbeteende.
	if (e.type == "drop") {
		dragWordElem.innerHTML ="";
		moveBackToList(e.dataTransfer.getData("text"));
	}
} // End wordOverList

// Flytta tillbaks ordet till listan
function moveBackToList(word) { // word är det ord som ska flyttas tillbaks
	var i; //variabel för att hålla redan på platsen på word
	i=words8.indexOf(word);
	wordElems[i].innerHTML=words8[i];
} // End moveBackToList

// Kontrollera användarens svar och visa de korrekta svaren
function checkAnswers() {
	var i;  //loopvariabel
	var points=0; //variabel för att hålla reda på antal poäng
	for(i=0; i < picsIx4.length; i++){
		if(userAnswerElems[i].innerHTML == ""){
			alert("Dra först ord till alla bilder");
			return;
		}
	}
	eventsForDrag(false);
	for(i=0; i < picsIx4.length; i++){
		if(userAnswerElems[i].innerHTML== allPics[picsIx4[i]]){
			points++;
			correctAnswerElems[i].innerHTML=allPics[picsIx4[i]] + "<br>" + allDescription[picsIx4[i]];
		}
	msgElem.innerHTML="Spelet är slut! Du fick " + points + " poäng!";
	}
	startGameBtn.disabled=false;
	checkAnswersBtn.disabled=true;
} // End checkAnswers