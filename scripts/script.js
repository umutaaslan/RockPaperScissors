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
const rockImg = document.querySelector(".rockImg");
const paperImg = document.querySelector(".paperImg");
const scissorImg = document.querySelector(".scissorImg");
const computersChoiceShower = document.querySelector(".computersChoiceShower");

function addGlobalEventListener(type, selector, callback, parent = document){
    parent.addEventListener(type, e => {
        if(e.target.matches(selector)) callback(e);
    })
}

//get human choice
buttonsRps.forEach(btn => {
    btn.addEventListener("click", e => {
        humanChoice = e.target.id;
        e.target.setAttribute("style", "box-shadow: 0 2px; background-color: #3e8e41; transform: translateY(4px);" );
        switch(e.target.id){
            case "Rock":
                buttonsRps[1].removeAttribute("style");
                buttonsRps[2].removeAttribute("style");
                rockImg.style = "display: block;";
                paperImg.style = "display: none";
                scissorImg.style = "display: none";
                break;
            case "Paper":
                buttonsRps[0].removeAttribute("style");
                buttonsRps[2].removeAttribute("style");
                rockImg.style = "display: none;";
                paperImg.style = "display: block";
                scissorImg.style = "display: none";
                break;
            case "Scissor":
                buttonsRps[0].removeAttribute("style");
                buttonsRps[1].removeAttribute("style");
                rockImg.style = "display: none;";
                paperImg.style = "display: none";
                scissorImg.style = "display: block";
                break;
        }
    })
})


let humanScore = 0;
let computerScore = 0;
let playTime;

function getPlayTime() {
    playTime = Number(input.value);
    if (!isNaN(playTime) && playTime > 0) {
        preGameDiv.style = "display: none;"
        playDiv.style = "display: flex";
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


let cloneElement1;

function computerChoiceShower(){
    if(document.querySelector(".computersChoiceShower > img")) {
        cloneElement1.remove();
    }
    switch(computerChoice){
        case "Rock":
            cloneElement1 = rockImg.cloneNode(true);
            cloneElement1.style = "display: block;";
            computersChoiceShower.appendChild(cloneElement1);
            break;
        case "Paper":
            cloneElement1= paperImg.cloneNode(true);
            cloneElement1.style = "display: block;";
            computersChoiceShower.appendChild(cloneElement1);
            break;
        case "Scissor":
            cloneElement1 = scissorImg.cloneNode(true);
            cloneElement1.style = "display: block;";
            computersChoiceShower.appendChild(cloneElement1);
            break;
    }
}

//if human won
function humanWon(){
    humanScore += 1;
    computerChoiceShower();
    whoWonShower.textContent = "You won";
}
//if computer won
function computerWon(){
    computerScore += 1;
    computerChoiceShower();
    whoWonShower.textContent = "Computer won";
}

//play round
function playRound(humanChoice, computerChoice){
    if(humanChoice == computerChoice){
        isItCount = false;
        computerChoiceShower();
        whoWonShower.textContent = "Tie";
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


let scoreShower;
function scoreShowerLastPage(){
    scoreShower = document.createElement("p");
    scoreShower.textContent = `Computer's score is: ${computerScore}, Your score is: ${humanScore}`;
}

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
                    scoreShowerLastPage();
                    userWonPage.appendChild(scoreShower);
                break;
                case "Computer":
                    computerWonPage.style = "display: block;";
                    scoreShowerLastPage();
                    computerWonPage.appendChild(scoreShower);
                    break;
                case "Tie":
                    tiePage.style = "display: block;";
                    scoreShowerLastPage();
                    tiePage.appendChild(scoreShower);
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

