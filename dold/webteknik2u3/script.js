// JavaScript
// Globala variabler
var startGameBtn;		//Referens till start-knappen (button)
var nextButton;         //Referens till nästa-knappen (button)
var picsElems;          //Referens till alla bildelement 
var picTiles;           //Array for att länka slumptal till bilder
var noTurns;            //Flagga för att hålla koll på antalet vända bilder
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

// Initiera globala variabler och koppla funktion till knapp
function init() {
    totalPoints=0;
    totalGames=0;
    meanScore=0;
    picIndex = [];          //Skapar en array
    selectedPicture = [];   //Skapar en array
    picTiles=[];            //Skapar en array
    noTurns=0;              //Sätter noTurns till 0
    startGameBtn=document.getElementById("startGameBtn");
    nextButton=document.getElementById("nextBtn");
    picsElems=document.getElementById("bricks").getElementsByTagName("img");
    showTurns=document.getElementById("turnNr");
    userTotPoints=document.getElementById("userTotPoints");
    userCountGames=document.getElementById("userCountGames");
    userMeanPoints=document.getElementById("userMeanPoints");
    //getCookie();            //Hämtar cookie värden
    addListener(startGameBtn,"click", startGame);
    addListener(nextButton,"click", checkPick);
    nextButton.disabled=true;

} //End init
addListener(window,"load",init); // Se till att init aktiveras då sidan är inladdad
addListener(window, "unload", saveCookie);

//Funktion för att initiera spel
function startGame() {
    //getCookie();            //Hämtar cookie värden
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

function turnPic() {
    
    //Koll om man redan valt två st kort, isf stannar funktionen.
    if(noTurns>=2) {  
        return;
    }    
    console.log("turnPic", noTurns); //Använde consol log för att felsöka hantera.
    
    picIndex[noTurns]=this.getAttribute("index"); //Sätt att hantera turnpic, länka bilder till tiles
    picsElems[picIndex[noTurns]].src="pics/"+picTiles[picIndex[noTurns]]+".png"
    picsElems[picIndex[noTurns]].className="brickFront";
    selectedPicture[noTurns]=picsElems[picIndex[noTurns]].src
    
    console.log("picIndex", picIndex[noTurns]); //Använde consol log för att felsöka hantera.


    if(picIndex[1]!=picIndex[0]) {
        console.log("same", picIndex[0], picIndex[1]);
        if(noTurns>=1) {
            for(i=0;i<picsElems.length;i++) {
                picsElems[i].disabled=true;
            }
            nextButton.disabled=false;  
        }    
        noTurns++;
    }    
    

} //End turnPic

function checkPick() {
    noTurns=0;
    console.log("Checkpick"); //Använde consol log för att felsöka hantera.
    if (selectedPicture[0]==selectedPicture[1]) { //bugg avs att man kunde klicka på samma bild två ggr och få upp nästa
        picsElems[picIndex[0]].src="pics/empty.png";
        picsElems[picIndex[1]].src="pics/empty.png";
        picsElems[picIndex[0]].className="brickEmpty";
        picsElems[picIndex[1]].className="brickEmpty";
        removeListener(picsElems[picIndex[0]], "click", turnPic);
        removeListener(picsElems[picIndex[1]], "click", turnPic);
        rightPicks=rightPicks+2
    } else {
        picsElems[picIndex[0]].src="pics/backside.png"
        picsElems[picIndex[1]].src="pics/backside.png"
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

function checkWin() {
    if(rightPicks==picsElems.length) {
        picIndex[0]=null; //Felsökte stor bugg, om man klickade på samma första gången gick det att vända tre bilder. Löstes genom denna kodrad.
        picIndex[1]=null; //Felsökte stor bugg, om man klickade på samma första gången gick det att vända tre bilder. Löstes genom denna kodrad.
        var points=20-Math.round((checkTurns-rightPicks/2)*1.2); //lokalvariabel för att räkna rundans poäng
        
        alert(points);


        //Om man får ett belopp under 0 ska poängen sättas till noll
        if (points<0) {
            points=0;
        }
        
        totalPoints+=points; //adderar rundans poäng till totalen
        
        //Uppdaterar användarens vy med poänginfo
        meanScore=totalPoints/totalGames;
        userCountGames.innerHTML=totalGames;
        userMeanPoints.innerHTML=meanScore;
        userTotPoints.innerHTML=totalPoints;

        nextButton.disabled=true;
        startGameBtn.disabled=false;
    }
} //End checkWin

//Funktion för att spara diverse värden i cookies
function saveCookie() {
    setCookie("totalScore", totalPoints);
    setCookie("totalGames", totalGames);
    setCookie("meanScore", meanScore);
}

//Funktion för att hämta värden från cookies och sparas i globala variabler
function getCookie() {
    totalPoints=getCookie("totalScore");
    totalGames=getCookie("totalGames");
    meanScore=getCookie("meanScore");
    if (totalPoints!=null) {
        userTotPoints=totalPoints;
    } else {
        totalPoints=0;
    }
    if (userCountGames!=null) {
        userCountGames=totalGames;
    } else {
        userCountGames=0;
    }
    if (userMeanPoints!=null) {
        userMeanPoints=meanScore;
    } else {
        userMeanPoints=0;
    }
}





