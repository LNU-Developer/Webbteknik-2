// JavaScript

// Globala variabler.
//InputElem för att läsa in alla värden från textfälten och msgElem för att byta ut element i HTML koden.
//fruitNames för att hantera alla namn som skall kontrolleras i funktionen checkName samt fruitNr som kommer jämföras med name.
//selFruitsElem för att lägga till bilder på frukt i ett elemnt.
var inputElem, msgElem, fruitNames, fruitNr, selFruitsElem;
fruitNames = [];
inputElem = [];
// Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd.
// Initiering av globala variabler samt koppling avfunktioner till knapparna.
function init() {
    fruitNames=["ingen frukt", "äpple", "banan", "citron", "apelsin", "päron"];
    fruitNr=0;
    inputElem[0] = document.getElementById("input1");
    inputElem[1] = document.getElementById("input2");
    inputElem[2] = document.getElementById("input3");
    selFruitsElem = document.getElementById("selectedFruits");
    msgElem = document.getElementById("message");
    document.getElementById("btn1").onclick=showFruit;
    document.getElementById("btn2").onclick=checkName;
    document.getElementById("btn3").onclick=addFruits;
} // End init
window.onload = init; // Se till att init aktiveras då sidan är inladdad

//Funktion för att kontrollera värdena som är inmatade samt returnera värdet nr om allt gått bra.
function getNr(elemNr, high) {
    //Lokal variabel för att omvandla användarens val i ett textfält till nummer (nr). 
    var nr;
    nr = Number(inputElem[elemNr-1].value);
    if(isNaN(nr)){
        msgElem.innerHTML = "Du måste skriva ett tal med siffror";
        return null;
    } //End-IF
    if(nr<1 || nr >high) {
        msgElem.innerHTML = "Du måste skriva ett tal med siffror mellan 1-5/eller 1-9";
        return null;
    } //End-IF
    nr=parseInt(nr);
    inputElem[elemNr-1].value=nr;
    return nr;
} //End showFruit()

//Funktion som genom användarens val av siffra, byter ut en bild i HTML kod genom att ändra nummer.
function showFruit() {
    //Lokal variabel för att omvandla användarens val i ett textfält till nummer (nr). 
    //Samt för att uppdatera bildfilens namn med vald siffra (fruitUrl).
    var fruit = document.getElementById("fruitImg");
    var nr, fruitUrl;

    nr=getNr(1, 5);

    if(nr != null) {
        fruitUrl= "pics/fruit" + nr + ".jpg";
        fruit.src=fruitUrl;
        fruitNr=nr;
    } //end-if

} //End showFruit()

//Funktion för att jämföra namnen i en array med namnet som användaren har angett i ett textfält.
function checkName () {
    if(fruitNr==0) {
        msgElem.innerHTML = "Välj frukt först";  
        return;
    } //End-if
    
    var name;
    
    name=inputElem[1].value;
    
    if(name==fruitNames[fruitNr]) {
        msgElem.innerHTML = "Rätt namn";   
    } else {
        msgElem.innerHTML = "Fel namn";
    } //End-if
} //End Checkname


//funktion för att lägga till ett valt antal bilder på frukter i ett element.

function addFruits(){
//variabel för att ange antalet frukter att lägga in i koden, samt imgList för att hitta frukten att lägga in.
var amount = Number(selFruitsElem.value), imgList="";

if(amount==0) {
    msgElem.innerHTML = "Välj frukt först";  
    return;
} //End-if

amount = getNr(3, 9);

if (amount != 0){
    for (i=0; i<amount; i++) {
        imgList += "<img src='pics/fruit" + fruitNr + ".jpg' alt='fruit'>";
    } //end-for
    selFruitsElem.innerHTML += imgList;
} //end-if
} //End addFruits()





