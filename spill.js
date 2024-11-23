function litennav() {
    const nav = document.getElementById("litennav");
    const body = document.body;
    if (nav.classList.contains("vis")) {
        nav.classList.remove("vis");
        body.style.overflow = "auto"; 
    } else {
        nav.classList.add("vis");
        body.style.overflow = "hidden";
    }
}
let rettSvar = 0;
let score = 0;
let tid = 0;
let feil1 = 0;
let feil2 = 0;
let feil3 = 0;
let rett = 0;
let type = 0;

const box = document.getElementById("sky");
let tidInterval;

function tidSidenStart() {
    tid += 0.1
    document.getElementById("tid").innerHTML = Math.round(tid * 10);

}

function start() {
    const random = Math.floor(Math.random() * 20) + 1;
    const nummer = parseInt(random);
    const binartall = nummer.toString(2);
    
    document.getElementById("p2").innerHTML = binartall;
    rettSvar = random

    box.classList.remove("tallFall");
    void box.offsetWidth;
    box.classList.add("tallFall");
    tapt()
    if (!tidInterval) {
        tidInterval = setInterval(tidSidenStart, 1000);
    }
}


function ror() {
    rett = Math.floor(Math.random() * 3) + 1;
    feil1 = Math.floor(Math.random() * 10) + 1;
    feil2 = Math.floor(Math.random() * 10) + 1;
    feil3 = Math.floor(Math.random() * 10) + 1;

    if (rett === 1) {
        document.getElementById("rørp1").innerHTML = rettSvar;
        document.getElementById("rørp2").innerHTML = Math.abs(rettSvar - feil2);
        document.getElementById("rørp3").innerHTML = Math.abs(rettSvar + feil3);
    } else if (rett === 2) {
        document.getElementById("rørp1").innerHTML = Math.abs(rettSvar + feil1);
        document.getElementById("rørp2").innerHTML = rettSvar;
        document.getElementById("rørp3").innerHTML = Math.abs(rettSvar -feil3);
    } else {
        document.getElementById("rørp1").innerHTML = Math.abs(rettSvar - feil1);
        document.getElementById("rørp2").innerHTML = Math.abs(rettSvar + feil2);
        document.getElementById("rørp3").innerHTML = rettSvar;
    }
}

function ror1() {
    const rørp1Innhold = parseInt(document.getElementById("rørp1").innerHTML);
    if (rørp1Innhold == rettSvar) {
        if(type == 1){
            score += 1;
        } else if(type = 2){
            score += 10;
        }
        
        document.getElementById("score").innerHTML = score;
        start()
    } else {
        score -= 10;
        document.getElementById("score").innerHTML = score;
    }
    if (score > 0) {
        ror()
        setTimeout(ror, 10)
    }
    tapt() 
}

function ror2() {
    const rørp2Innhold = parseInt(document.getElementById("rørp2").innerHTML);
    if (rørp2Innhold == rettSvar) {
        if(type == 1){
            score += 1;
        } else if(type = 2){
            score += 10;
        }
        document.getElementById("score").innerHTML = score;
        start()
    } else {
        score -= 10;
        document.getElementById("score").innerHTML = score;
    }
    if (score > 0) {
        ror()
        setTimeout(ror, 10)
    }
    tapt()
}
function ror3() {
    const rørp3Innhold = parseInt(document.getElementById("rørp3").innerHTML);
    if (rørp3Innhold == rettSvar) {
        if(type == 1){
            score += 1;
        } else if(type = 2){
            score += 10;
        }
        document.getElementById("score").innerHTML = score;
        start()
    } else {
        score -= 10;
        document.getElementById("score").innerHTML = score;
    }
    if (score >= 0) {
        ror()
        setTimeout(ror, 10)
    }
    tapt()

}

function finnPosisjon() {
    const sky = document.getElementById("sky");
    const posisjon = sky.getBoundingClientRect();
    let hoydeForhold = Math.round(posisjon.top / window.innerHeight * 1000);
    if (hoydeForhold >= 750) {
        score -= 5;
        document.getElementById("score").innerHTML = score;
        console.log("Score decreased to:", score);
        box.classList.remove("tallFall");
        void box.offsetWidth;
        box.classList.add("tallFall");
    }
    if (score < 0) {
        tapt();
    }
}

setInterval(finnPosisjon, 0)



function tapt() {
    if (score < 0) {
        score = 0;
        document.getElementById("tapt").innerHTML = "Du har Tapt";
        document.getElementById("score").innerHTML = score;
        clearInterval(tidInterval);
        tidInterval = null;
        tid = 0;

        document.getElementById("rørp1").innerHTML = "";
        document.getElementById("rørp2").innerHTML = "";
        document.getElementById("rørp3").innerHTML = "";
        box.classList.remove("tallFall");
        void box.offsetWidth;
    } else if(score > 100){
        document.getElementById("tapt").innerHTML = "Du har Vunnet";
        document.getElementById("score").innerHTML = score;
        clearInterval(tidInterval);
        tidInterval = null;
        tid = 0;

    }else {
        document.getElementById("tapt").innerHTML = "";
    }
}
