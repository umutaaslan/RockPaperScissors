let isItCount = true;
let humanChoice;
let computerChoice = getComputerChoice();
const input = document.querySelector("#playTime");
const button = document.querySelector("#startPlay");
const buttonsRps = document.querySelectorAll("#Rock, #Paper, #Scissor");
const userWonPage = document.querySelector(".userWonPage");
const computerWonPage = document.querySelector(".computerWonPage");
const tiePage = document.querySelector(".tiePage");
const preGameDiv = document.querySelector(".preGame");
const playDiv = document.querySelector(".play");
const whoWonShower = document.querySelector(".whoWonShower");

function addGlobalEventListener(type, selector, callback, parent = document){
    parent.addEventListener(type, e => {
        if(e.target.matches(selector)) callback(e);
    })
}

//get human choice
buttonsRps.forEach(btn => {
    btn.addEventListener("click", e => {
        humanChoice = e.target.id;
        document.querySelector(".userChoiceShower").textContent = e.target.id;
    })
})


let humanScore = 0;
let computerScore = 0;
let playTime;

function getPlayTime() {
    playTime = Number(input.value);
    if (!isNaN(playTime) && playTime > 0) {
        preGameDiv.style = "display: none;"
        playDiv.style = "display: block";
        console.log(playTime);
    }
    else{
        input.value = "";
        input.focus();
        alert("Please enter a number");
    }
}

//get play time
addGlobalEventListener("click", "#startPlay", e => {
    getPlayTime();
})

input.addEventListener("keydown", e => {
    if(e.key == "Enter") {
        getPlayTime();
    }
})

document.addEventListener("click", e => {
    if(input.value !== "") {
        input.focus();
    }
})


//make random choice as computer choice
function getComputerChoice(){
    let randomNumber = Math.floor(Math.random() * 3);
    switch(randomNumber){
        case 0:
            return "Rock";
        case 1:
            return "Paper";
        case 2:
            return "Scissor";    
    }
}

//if human won
function humanWon(){
    humanScore += 1;
    whoWonShower.textContent = (`YOU WON!\ncomputer's choice : ${computerChoice} `);
}

//if computer won
function computerWon(){
    computerScore += 1;
    whoWonShower.textContent = (`computer won\ncomputer's choice : ${computerChoice}`);
}

//play round
function playRound(humanChoice, computerChoice){
    if(humanChoice === computerChoice){
        console.log("tie");
        isItCount = false;
        whoWonShower.textContent = "tie";
    }
    else if (
        (humanChoice == "Rock" && computerChoice == "Scissor") ||
        (humanChoice == "Scissor" && computerChoice == "Paper") ||
        (humanChoice == "Paper" && computerChoice == "Rock")
    ) {
        humanWon();
        isItCount = true;
    }
    else{
        computerWon();
        isItCount = true;
    }
}

let whoWon; 


let counter = 0;
addGlobalEventListener("click", "#fight", e => {
    if (counter < playTime ){
        computerChoice = getComputerChoice();
        playRound(humanChoice, computerChoice);
        if(++counter === playTime){
            document.querySelectorAll(".play button, .userChoiceShower").forEach(element => {
                element.style = "display:none;";
            });
            setTimeout(() => {
                whoWonShower.style = "display: block";
            }, 500);
            setTimeout(() => {
                playDiv.style = "display: none;",
            whoWon = (humanScore > computerScore) ? "User":
            (computerScore > humanScore) ? "Computer":
            "Tie";
            switch(whoWon){
                case "User":
                    userWonPage.style = "display: block;";
                break;
                case "Computer":
                    computerWonPage.style = "display: block;";
                    break;
                case "Tie":
                    tiePage.style = "display: block;";
                    break;
            } 
            }, 3000);
        }
        else counter--;
        counter++;
    }
    if (isItCount == false) {
        counter--;
    }
})

