const humanChoice = getHumanChoice();
const computerChoice = getComputerChoice();

let humanScore;
let computerScore;

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




