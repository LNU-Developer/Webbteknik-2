// JavaScript
// Globala variabler
var startGameBtn;		//Referens till start-knappen (button)
var nextButton;         //Referens till nästa-knappen (button)
var picsElems;          //Referens till alla bildelement 
var picTiles;           //Array for att länka slumptal till bilder
var numberofTurns;            //Flagga för att hålla koll på antalet vända bilder
var selectedPicture;    //Array för att hålla koll på valda bilder
var picIndex;           //Flagga för att hålla koll på valt index  
var checkTurns;         //Håller koll på antalet omgångar (för poäng)
var rightPicks;         //Håller koll på antalet rätta val
var showTurns;          //Referens till span element avs antalet turns.
var userTotPoints;      //Referens till span element avs totala poängen.
var userCountGames;     //Referens till span element avs antalet spel.
var userMeanPoints;     //Referens till span element avs medelpoängen.
var totalGames;         //Variabel som håller koll på antalet spel
var totalPoints;        //Variabel som håller koll på totala poängen
var meanScore;          //Variabel som håller koll på medelpoängen
var displayScore;       //Referens till displayknapp
var displayMore;        //Referens till classID
var bricks;             //Referens till bricks
var options;            //Referens til nrOfBricksMenu
var message;            //Referens till message i HTML koden

// Initiera globala variabler och koppla funktion till knapp
function init() {
    var i;          //Loopvariabel
    picIndex = [];          //Skapar en array
    selectedPicture = [];   //Skapar en array
    picTiles=[];            //Skapar en array
    numberofTurns=0;              //Sätter numberofTurns till 0
    startGameBtn=document.getElementById("startGameBtn");
    nextButton=document.getElementById("nextBtn");
    picsElems=document.getElementById("bricks").getElementsByTagName("img");
    showTurns=document.getElementById("turnNr");
    userTotPoints=document.getElementById("userTotPoints");
    userCountGames=document.getElementById("userCountGames");
    userMeanPoints=document.getElementById("userMeanPoints");
    displayScore=document.getElementById("userInfo").getElementsByTagName("a")[0];
    displayMore=document.getElementById("userMoreInfo");
    options=document.getElementById("nrOfBricksMenu");
    bricks=document.getElementById("bricks");
    message=document.getElementById("message");
    addListener(startGameBtn,"click", startGame);
    addListener(nextButton,"click", checkPick);
    addListener(displayScore,"click", showScore);
    addListener(options,"change", changeBricks);
    for(i=0;i<picsElems.length;i++) {
        picsElems[i].setAttribute("id", "initial"+i); //sätter ett unikt ID på ursprungliga img elementen i index.
    }
    nextButton.disabled=true;
} //End init
addListener(window,"load",init); // Se till att init aktiveras då sidan är inladdad
addListener(window, "unload", saveCookie); //sparar cookies vid unload av fönster
addListener(window, "load", getCookie); //hämtar cookies vid load

//Funktion för att initiera spel
function startGame() {
    message.innerHTML=""; //Tar bort meddelande vid nytt spel
    totalGames++;   //Antal spel ökar med 1
    startGameBtn.disabled=true;
    checkTurns=0;   //Nytt spel, noll omgångar
    rightPicks=0;   //Nytt spel, noll rätt
    var i;          //Loopvariabel
    //Alla bilder får baksidbilden
    for(i=0;i<picsElems.length;i++) {
        picsElems[i].src="pics/backside.png"
        picsElems[i].className="brickBack";
    }
    updateTiles(); //Anropa funktionen för att slumpa bilderna till varje bricka
    //Event för klick samt ett unikt attribut för att hitta bilder
    for(i=0;i<picsElems.length;i++) {
        addListener(picsElems[i], "click", turnPic);
        picsElems[i].setAttribute("index", i) //Sätt att hantera turnpic, länka bilder till tiles
    }
    options.disabled=true;
} //End startGame

//Funktion för att slumpa fram nya brickor
function updateTiles() {
    var picNo =[];          //Array för slumptal, väljer i sin tur bilden
    var i;                  //Loopvariabel
    var r;                  //Variabel för att ange ett slumpässigt tal
    var allNo = [];         //Array som skall hålla alla möjliga tal (för bildernas referens)
    var a, b;               //Variablar för att hålla temporära värden för shuffle av array   
    //Populera arrayn med maximalt möjliga referenser till bilderna
    for (i=0;i<20;i++) {
        allNo[i]=i;
    }

    //Tilldela ett random nummer mellan 0-20, antal gånger motsvarande hälften av alla picElems
    for (i=0; i<picsElems.length/2;i++) {
        r = Math.floor(Math.random()*allNo.length);
        picNo[i]=allNo[r]
        allNo.splice(r,1);
        picTiles[i]=picNo[i]
    }
    //Shuffla picNo arrayn
    for (i = picNo.length - 1; i > 0; i--) {
        a = Math.floor(Math.random() * (i + 1));
        b = picNo[i];
        picNo[i] = picNo[a];
        picNo[a] = b;
    }
    //Populera resterande del av array med slumpade siffror så att allt inte hamnar på motsvarande platser
    for (i=picsElems.length/2;i<picsElems.length;i++) {
        picTiles[i]=picNo[i-picsElems.length/2];
    }
}

//Funktion för att kontrollera att två unika tiles vänts och tillåter sedan användaren att klicka nästa
function turnPic() {
    //Koll om man redan valt två st kort, isf stannar funktionen.
    if(numberofTurns>=2) {  
        return;
    }    
    // console.log("turnPic", numberofTurns); //Använde consol log för att felsöka hantera.
    picIndex[numberofTurns]=this.getAttribute("index"); //Sätt att hantera turnpic, länka bilder till tiles
    picsElems[picIndex[numberofTurns]].src="pics/"+picTiles[picIndex[numberofTurns]]+".png"
    picsElems[picIndex[numberofTurns]].className="brickFront";
    selectedPicture[numberofTurns]=picsElems[picIndex[numberofTurns]].src
    // console.log("picIndex", picIndex[numberofTurns]); //Använde consol log för att felsöka hantera.
    if(picIndex[1]!=picIndex[0]) {
        // console.log("same", picIndex[0], picIndex[1]); //Använde consol log för att felsöka i hantera
        if(numberofTurns>=1) {
            for(i=0;i<picsElems.length;i++) {
                picsElems[i].disabled=true;
            }
            nextButton.disabled=false;  
        }    
        numberofTurns++;
    }    
} //End turnPic

//Funktion för att kontrollera att valen man gjort är rätt eller fel
function checkPick() {
    numberofTurns=0;
    // console.log("Checkpick"); //Använde consol log för att felsöka hantera.
    if (selectedPicture[0]==selectedPicture[1]) { //bugg avs att man kunde klicka på samma bild två ggr och få upp nästa
        picsElems[picIndex[0]].src="pics/empty.png";
        picsElems[picIndex[1]].src="pics/empty.png";
        picsElems[picIndex[0]].className="brickEmpty";
        picsElems[picIndex[1]].className="brickEmpty";
        removeListener(picsElems[picIndex[0]], "click", turnPic);
        removeListener(picsElems[picIndex[1]], "click", turnPic);
        rightPicks=rightPicks+2;
    } else {
        picsElems[picIndex[0]].src="pics/backside.png";
        picsElems[picIndex[1]].src="pics/backside.png";
        picsElems[picIndex[0]].className="brickBack";
        picsElems[picIndex[1]].className="brickBack";
        picIndex[0]=null; //Felsökte stor bugg, om man klickade på samma första gången gick det att vända tre bilder. Löstes genom denna kodrad.
        picIndex[1]=null; //Felsökte stor bugg, om man klickade på samma första gången gick det att vända tre bilder. Löstes genom denna kodrad.
    }
    checkTurns++;
    for(i=0;i<picsElems.length;i++) {
        picsElems[i].disabled=false;
    }
    showTurns.innerHTML=checkTurns;
    nextButton.disabled=true;
    checkWin();
} //End checkPick

//Funktion för att kontrollera om man vunnit eller ej samt uträkning av totala poäng, medelvärde och antal spel. Skickar detta till GUIt
function checkWin() {
    if(rightPicks==picsElems.length) {
        picIndex[0]=null; //Felsökte stor bugg, om man klickade på samma första gången gick det att vända tre bilder. Löstes genom denna kodrad.
        picIndex[1]=null; //Felsökte stor bugg, om man klickade på samma första gången gick det att vända tre bilder. Löstes genom denna kodrad.
        var points=20-Math.round((checkTurns-rightPicks/2)*1.2); //lokalvariabel för att räkna rundans poäng
        
        //Om man får ett belopp under 0 ska poängen sättas till noll
        if (points<0) {
            points=0;
        }

        message.innerHTML="Grattis! Du hittade alla rutor. Dina poäng blev "+points;

        totalPoints+=points; //adderar rundans poäng till totalen
        //Uppdaterar användarens vy med poänginfo
        meanScore=Math.round(Number(totalPoints/totalGames));
        userCountGames.innerHTML=totalGames;
        userMeanPoints.innerHTML=meanScore;
        userTotPoints.innerHTML=totalPoints;
        nextButton.disabled=true;
        startGameBtn.disabled=false;
        options.disabled=false;
    }
} //End checkWin

//Funktion för att spara diverse värden i cookies
function saveCookie() {
    setCookie("totalScore", totalPoints); //spara ned cookievärde
    setCookie("totalGames", totalGames);   //spara ned cookievärde
    setCookie("meanScore", meanScore);  //spara ned cookievärde
}

//Funktion för att hämta värden från cookies och sparas i FUIt
function getCookie() {
    var cookieTotal, cookieGames, cookieMean; //Lokala variabler för att hämta nummer värden från cookies
    cookieTotal = Number(getCookie("totalScore"));
    cookieMean = Number(getCookie("meanScore"));
    cookieGames = Number(getCookie("totalGames"));
    // console.log("Nu körs getCookie", cookieTotal, cookieMean, cookieGames); //för att felsöka varför cookies inte kördes. Löstes från att köra funktionen getCookie(); i init till add listener.
    //If satser för att ange antingen cookies värde om detta finns, alt. 0 då det är ett helt nytt spel
    if (cookieTotal!=null) {
        totalPoints=cookieTotal
    } else {
        totalPoints=0;
    }
    if (cookieMean!=null) {
        meanScore=cookieMean;
    } else {
        meanScore=0;
    }
    if (cookieGames!=null) {
        totalGames=cookieGames;
    } else {
        totalGames=0;
    }
    //Skriver ut värdena till GUI.
    userTotPoints.innerHTML=totalPoints;
    userCountGames.innerHTML=totalGames;
    userMeanPoints.innerHTML=meanScore;
}

//Funktion för att visa/dölja mer information för användaren
function showScore () {
    if (displayMore.style.display=="block") {
        displayMore.style.display="none"
    } else {
        displayMore.style.display="block"; 
    }
}

//Funktion för att hantera valet av antal brickor som användaren görs
function changeBricks() {
    var userOptions= options.options[options.selectedIndex].text; //skriver ut vald option i textsträng
    var length = picsElems.length; //lokalt sparad variabel för att erhålla antalet img element innan det börjas göras modifieringar till denna
    var x, y; //variabler för att hålla nummerna från options
    var i; //Loopvariabel
    var total; //räknar ut totala bricks
    x=Number(userOptions.charAt(0));
    y=Number(userOptions.charAt(2));
    total=x*y;

        for(i=0;i<length;i++) {
            var remImg = document.getElementById("initial"+i); //lokalvaribel för att koppla ett img element i taget
            remImg.parentNode.removeChild(remImg); //tar bort initiala img elementen.
        }

    //Anpassar width beroende på valda bricks
    if(total==30) {
        bricks.style.width="400px";
    } else if (total==36) {
        bricks.style.width="450px";
    } else {
        bricks.style.width="280px";
    }
    
    //Skapar nya img element baserat på valet användaren gjort
    for (i=0; i<total; i++) {
        var img = document.createElement("img");
        img.setAttribute("src", "pics/backside.png");
        img.setAttribute("alt", "spelbricka");
        img.setAttribute("class", "brickBack");
        img.setAttribute("id", "initial"+i)
        bricks.appendChild(img);
    }
}