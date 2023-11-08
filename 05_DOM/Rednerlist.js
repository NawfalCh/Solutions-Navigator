




let liste = [];
let starttime;
let elapsedtime = 0;
let timerinterval;
let running;

function myKeyup(ev) {
    if (ev.key === "Enter") {
        additem();
        document.getElementById('item').value = "";
    }
}

function additem() {
    var redner = {name: document.getElementById('item').value, time: 0}
    liste.push(redner);
    document.getElementById('item').value = "";
    renderlist();
    start(liste.length - 1);
}

function renderlist() {
    if (liste.length !== 0) {
        if (running !== undefined) {
            stop(running);
        }
        let str = '<ul id="renderedlist">';
        let counter = 0;
        liste.forEach(function (l) {
            str += `<li>${l.name} ` + `<span id="${counter}">${timeToString(l.time)}</span>` +
                ` <button onclick="start(${counter})">Start!</button>` +
                ` <button onclick="stop(${counter})" style="display: none">Stop!</button>` +
                '</li>';
            counter++;
        });
        str += '</ul>';
        document.getElementById("liste").innerHTML = str;
    }
}

function clearall() {
    if (running !== undefined) {
        stop(running);
        running = undefined;
    }
    liste = [];
    document.getElementById("renderedlist").remove();
}

function start(id) {
    if (running !== undefined) {
        stop(running);
    }
    running = id;
    starttime = Date.now() - liste[id].time;
    timerinterval = setInterval(function printtime() {
        elapsedtime = Date.now() - starttime;
        document.getElementById(id).innerHTML = timeToString(elapsedtime)
    }, 10);
    const btn = document.getElementById(id).nextElementSibling;
    btn.style.display = "none";
    btn.nextElementSibling.style.display = "inline";
}

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);

    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    let formattedMS = ms.toString().padStart(2, "0");

    return `${formattedMM}:${formattedSS}:${formattedMS}`;
}

function stop(id) {
    clearInterval(timerinterval);
    liste[id].time = elapsedtime;
    const btn = document.getElementById(id).nextElementSibling;
    btn.style.display = "inline";
    btn.nextElementSibling.style.display = "none";
}