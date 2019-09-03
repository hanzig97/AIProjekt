function dragstart_handler(ev) {
    ev.dataTransfer.setData("text/plain", ev.target.id);
}

function dragover_handler(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "copy"
}

function drop_handler(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text/plain");
    var nodeCopy = document.getElementById(data).cloneNode(true);
    nodeCopy.id = data + "-new";
    ev.target.appendChild(nodeCopy);

    let pickedAnswer = Number(nodeCopy.innerText);
    let qq = Number(document.getElementById('qq').innerText);
    let qa = Number(document.getElementById('qa').innerText);

    if ((qq + pickedAnswer) === qa) {
        alert("Dobra odpowiedź!");
        randomizeData();
    } else {
        alert("Zła odpowiedź. Spróbuj jeszcze raz!");
    }

    let empty = document.getElementById('empty');
    while (empty.firstChild) {
        empty.removeChild(empty.firstChild);
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomizeData() {
    let qa = getRandomInt(0, 9);
    let qq = getRandomInt(0, qa);

    let good = qa - qq;
    let wrongFirst;
    let wrongSecond;

    do {
        wrongFirst = getRandomInt(0, 9);
    }
    while(wrongFirst == good);

    do {
        wrongSecond = getRandomInt(0, 9);
    }
    while(wrongSecond === good || wrongSecond === wrongFirst);

    let whichGood = getRandomInt(1, 3);
    switch(whichGood) {
        case 1:
            document.getElementById('a1').innerText = good;
            document.getElementById('a2').innerText = wrongFirst;
            document.getElementById('a3').innerText = wrongSecond;
            break;
        case 2:
            document.getElementById('a1').innerText = wrongFirst;
            document.getElementById('a2').innerText = good;
            document.getElementById('a3').innerText = wrongSecond;
            break;
        case 3:
            document.getElementById('a1').innerText = wrongFirst;
            document.getElementById('a2').innerText = wrongSecond;
            document.getElementById('a3').innerText = good;
            break;
    }


    document.getElementById('qa').innerText = qa;
    document.getElementById('qq').innerText = qq;
}

randomizeData();