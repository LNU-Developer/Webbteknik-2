
var input1Elem, input2Elem, resultElem;
var distance;

function init() {
    input1Elem = document.getElementById("input1");
    input2Elem = document.getElementById("input2");
    resultElem = document.getElementById("result");
    document.getElementById("runBtn").onclick= testscript;
}

window.onload = init;

function testscript() {
    var speed = Number(input1Elem.value);
    var time = Number(input2Elem.value);
    var reactionTime=3;
    var speedMS;
    var car = ["Volvo", "BMW", "Ferrari"];
    var accTime = [10.5, 7, 4.3];
    var acc;

    distance = speed*time/60;
    resultElem.innerHTML = "Sträckan blir " + distance + " km. <br><br>";
    time = distance/(speed-20)*60;
    resultElem.innerHTML += "Tiden för samma sträcka, om hastigheten är 20 km/h lägre bli " + time + " minuter. <br><br>";
    speedMS = speed*1000/3600;
    distance = speedMS*reactionTime;
    resultElem.innerHTML += "Om reaktionstiden är " + reactionTime + " sekunder blir reaktionssträckan " + distance + " m. <br><br>";
    speedMS = 100*1000/3600;
    distance = speedMS*accTime[0]/2;
    resultElem.innerHTML += car[0] + " 0-100 på " + accTime[0] + " sek. på " + distance + " meter. <br>";
    distance = speedMS*accTime[1]/2;
    resultElem.innerHTML += car[1] + " 0-100 på " + accTime[1] + " sek. på " + distance + " meter. <br>";
    distance = speedMS*accTime[2]/2;
    resultElem.innerHTML += car[2] + " 0-100 på " + accTime[2] + " sek. på " + distance + " meter. <br><br>";
    speedMS = (40+speed)/3.6;
    distance = speedMS*20;
    resultElem.innerHTML += "Sträckan, om hastigheten är 40 km/h högre, blir " + distance + " m. på 20 sekunder. <br><br>";
    acc=100/3.6/accTime[1];
    resultElem.innerHTML += "Accelerationen för en " + car[1] + " är " + acc + " m/s<sup>2</sup>. <br><br>";
}
