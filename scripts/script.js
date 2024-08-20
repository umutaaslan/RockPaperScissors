let playTime = Number(prompt("How many time you wanna play")); 
let isItCount = true;
let humanChoice;
let computerChoice = getComputerChoice();


let humanScore = 0;
let computerScore = 0;

//get human choice
function getHumanChoice(){
    let userInput = prompt("which is your choice? (Rock, Paper, Scissor)");
    if (userInput != null && userInput != undefined && userInput != ""){
        return userInput;
    }
    else {
        alert("please choose one");
        getHumanChoice();
    }
}

//make random choice as computer choice
function getComputerChoice(){
    let randomNumber = Math.floor(Math.random() * 3);
    switch(randomNumber){
        case 0:
            return "rock";
        case 1:
            return "paper";
        case 2:
            return "scissor";    
    }
}

//if human won
function humanWon(){
    humanScore += 1;
    alert("YOU WON!");
}

//if computer won
function computerWon(){
    computerScore += 1;
    alert("computer won");
}

//play round
function playRound(humanChoice, computerChoice){
    if(humanChoice === computerChoice){
        alert("tie");
        isItCount = false;
    }
    else if(humanChoice == "rock" && computerChoice == "scissor"){
        humanWon();
        isItCount = true;
    }
    else if(humanChoice == "scissor" && computerChoice == "paper"){
        humanWon();
        isItCount = true;
    }
    else if(humanChoice == "paper" && computerChoice == "rock"){
        humanWon();
        isItCount = true;
    }
    else{
        computerWon();
        isItCount = true;
    }
}

//play until play time is finish
for(let i = 0; i < playTime; i++){
    humanChoice = getHumanChoice();
    computerChoice = getComputerChoice();
    playRound(humanChoice, computerChoice);
    //if it is tie, do not count it
    if(isItCount == false){
        playTime++;
    }
}


alert(`your score is: ${humanScore}\ncomputer's score is: ${computerScore}`);

let whoWon = (humanScore > computerScore) ? "YOU WOOOOOOOON!":
(computerScore > humanScore) ? "Wow, computer won. You're such a loser":
"Tie";

alert(whoWon);