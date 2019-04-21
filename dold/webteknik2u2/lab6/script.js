// JavaScript Document

// Globala variabler
var formElem;		// Referens till elementet med hela formuläret
var totalCostElem;	// Referens till elementet för totalpris
var re; //reguljärt uttryck för att kolla att telefonnr och posttnnr är korrekt
var errMsg; //felmeddelande

// Initiera globala variabler och koppla funktion till knapp
function init() {
	var i;		// Loopvariabel
	formElem = document.getElementById("booking");
	totalCostElem = document.getElementById("totalCost");
	
	for (i=0; i<formElem.roomType.length; i++) {
		addListener(formElem.roomType[i], "click", checkIfFamilyRoom);
		addListener(formElem.roomType[i], "click", calculateCost);
	}

	for (i=0; i<formElem.addition.length; i++) {
		addListener(formElem.addition[i], "click", calculateCost);
	}
	addListener(formElem.nights, "change", calculateCost);
	addListener(formElem.city, "blur", checkCity)
	addListener(formElem.telephone, "blur", checkTelephone)
	addListener(formElem.zipcode, "blur", checkZipcode)
	re = [
		/^\d{3} ?\d{2}$/,						// Postnummer
		/^0\d{1,3}[-/ ]?\d{5,8}$/				// Telefonnummer
	];
	errMsg = [
		"Postnumret måste bestå av fem siffror.",
		"Telnr måste börja med en 0:a och sedan 6-11 siffror."
	];
	checkIfFamilyRoom();
	calculateCost();
	addListener(formElem.campaigncode, "focus", startCheckCampaign);
	addListener(formElem.campaigncode, "keyup", checkCampaign);
	addListener(formElem.campaigncode, "blur", endCheckCampaign);
} // End init
addListener(window,"load",init);

//funktion som kontrollerar om det är ett familjerum eller ej
function checkIfFamilyRoom() {
	if (formElem.roomType[2].checked==true) {
		formElem.persons.disabled=false;
		formElem.persons.parentNode.style.color="#000";
		formElem.addition[2].disabled=true;
		formElem.addition[2].parentNode.style.color="#999";
	} else {
		formElem.persons.disabled=true;
		formElem.persons.parentNode.style.color="#999";
		formElem.addition[2].disabled=false;
		formElem.addition[2].parentNode.style.color="#000";
		
	}
}

//funktion som kalkylerar totalkostnaden för alla val och anger detta värde i ett element synligt för användaren
function calculateCost() {
	var i; //Loopvariabel
	var elemValue; //Värden i olika form, t.ex nätter och antal personer
	var roomPrice; //Pris för valt rum 
	var nightsIndex; //referens till att ta ut valt antal nätter
	var nrOfNights; //Variabel som håller reda på antalet nätter

	for (i=0; i<formElem.roomType.length;i++) {
		if (formElem.roomType[i].checked==true) {
			elemValue=formElem.roomType[i].value;
			roomPrice=Number(elemValue.split(",")[1]);
			break;
		}
	}
	for (i=0; i<formElem.addition.length; i++) {
		if (formElem.addition[i].checked==true && formElem.addition[i].disabled!=true) {
			elemValue=formElem.addition[i].value;
			roomPrice+=Number(elemValue.split(",")[1]);
		}
	}
	nightsIndex=formElem.nights.selectedIndex;
	nrOfNights=Number(formElem.nights.options[nightsIndex].value);
	totalCostElem.innerHTML = nrOfNights*roomPrice;
}

//funktion som ändrar små bokstäver till stora
function checkCity() {
	var city = formElem.city.value; //hämtat värdet från city elementet
	city=city.toUpperCase();
	formElem.city.value=city;
}

// Kontrollera innehållet i theField. index används till reguljärt uttryck och felmeddelande.
function checkField(theField,index) {
	var errMsgElem; // Referens till andra span-elementet
	errMsgElem = theField.parentNode.parentNode.getElementsByTagName("span")[1];
	errMsgElem.innerHTML = "";
	if (!re[index].test(theField.value)) {
		errMsgElem.innerHTML = errMsg[index];
		return false;
	}
	else return true;
} // checkField


//Funktion som anropar checkField med värderna från zipcode och index 2
function checkZipcode () {
	checkField(formElem.zipcode, 0);
}

//Funktion som anropar checkField med värderna från telephone och index 1
function checkTelephone () {
	checkField(formElem.telephone, 1);
}

//funktion som ändrar bakgrundsfärg till rött och markerar hela texten
function startCheckCampaign () {
this.style.backgroundColor="#F99";
this.select();
}

//Funktion som nollställer bakgrgrundsfärg och ändrar bokstäver till stora bokstäver.
function endCheckCampaign () {
	this.style.backgroundColor="";
	var campaignValue = formElem.campaigncode.value; //variabel för att erhålla value från elementet campaigncode
	campaignValue=campaignValue.toUpperCase();
	formElem.campaigncode.value=campaignValue;
}

//Funktion för att kontrollera att rätt tecken anges. Ändrar bakgrundsfärg för att indikera om det är OK eller ej
function checkCampaign(){
	var re; //Reguljärt uttryck som kollar kampanjkoden
	re= /^[A-ZÅÄÖ]{3}(-)\d{2}(-)[A-ZÅÄÖ]{1}\d{1}/i;
	
	if(re.test(this.value)){ 
		this.style.backgroundColor = "#6F9";
		}
	else {this.style.backgroundColor = "#F99";
	}
}