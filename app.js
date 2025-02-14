
let gameSeq = [];
let userSeq = [];

let boxs = ["yellow", "green", "red", "purple"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function(){
    if(started == false) {
        console.log("game is started");
        started = true; 

        levelUp();
    }
});

function boxflash(box) {
   box.classList.add("flash");
   setTimeout(function() {
    box.classList.remove("flash");
   }, 250)
}

function userflash(box) {
   box.classList.add("userflash");
   setTimeout(function() {
    box.classList.remove("userflash");
   }, 250)
}


function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `level ${level}`;

    let ranIdx = Math.floor(Math.random() * 3);
    let ranColor = boxs[ranIdx];
    let ranBox = document.querySelector(`.${ranColor}`);
  
    gameSeq.push(ranColor);
    console.log(gameSeq);
    boxflash(ranBox);
}

function checkAns(idx) {
    if(userSeq[idx] == gameSeq[idx]) {
       if(userSeq.length == gameSeq.length) {
        setTimeout(levelUp, 1000);
       } 
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
          document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function boxPress() {
    let box = this;
    userflash(box)
    // console.log(this); 
    userColor = box.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBoxs = document.querySelectorAll(".box");
for(box of allBoxs) {
    box.addEventListener("click", boxPress)
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}