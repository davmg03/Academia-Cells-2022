let userScore = 0;
let computerScore = 0;
let userScore_span = document.getElementById("user-score");
let computerScore_span = document.getElementById("computer-score");
let scoreBoard_div = document.querySelector(".score-board");
let result_p = document.querySelector(".result > p");
let rock_div =document.getElementById("r");
let paper_div =document.getElementById("p");
let scissors_div =document.getElementById("t");

function getComputerChoice(){
    let choices = ["r", "p", "t"];
    let randomNumber = Math.floor(Math.random()*3);
    return choices[randomNumber];
}

function convertToWord(letter){
    if (letter === "r") return "Piedra";
    if (letter === "p") return "Papel";
    return "Tijeras"
}

function win(userChoice, ComputerChoice){
    userScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    let smallUserWord = "Usuario".fontsize(3).sub();
    let smallCompWord = "Comp.".fontsize(3).sub();
    let userChoice_div =document.getElementById(userChoice);
    result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWord} Vence a ${convertToWord(ComputerChoice)}${smallCompWord}. ¡ Tú ganas :) !"`;
    userChoice_div.classList.add("green-glow");
    setTimeout(() => userChoice_div.classList.remove("green-glow"), 300);
}

function lose(userChoice, ComputerChoice){
    computerScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    let smallUserWord = "Usuario".fontsize(3).sub();
    let smallCompWord = "Comp.".fontsize(3).sub();
    let userChoice_div =document.getElementById(userChoice);
    result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWord} Pierde contra ${convertToWord(ComputerChoice)}${smallCompWord}. Tú pierdes :( ..."`;
    userChoice_div.classList.add("red-glow");
    setTimeout(() => userChoice_div.classList.remove("red-glow"), 300);
}

function draw(userChoice, ComputerChoice){
    let smallUserWord = "Usuario".fontsize(3).sub();
    let smallCompWord = "Comp.".fontsize(3).sub();
    let userChoice_div =document.getElementById(userChoice);
    result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWord} Es igual a ${convertToWord(ComputerChoice)}${smallCompWord}. Empate vuelve a intertar :|"`;
    userChoice_div.classList.add("gray-glow");
    setTimeout(() => userChoice_div.classList.remove("gray-glow"), 300);
}

function game(userChoice){
   let ComputerChoice = getComputerChoice();
   switch (userChoice + ComputerChoice){
    case "rt":
    case "pr":
    case "tp":
        win(userChoice, ComputerChoice);
        break;
    case "rp":
    case "pt":
    case "tr":
        lose(userChoice, ComputerChoice);
        break;
    case "rr":
    case "pp":
    case "tt":
        draw(userChoice, ComputerChoice);
        break;
   }
}

function main(){
rock_div.addEventListener("click", () => game("r"));

paper_div.addEventListener("click",() => game("p"));

scissors_div.addEventListener("click",() => game("t")); 
}

main();




