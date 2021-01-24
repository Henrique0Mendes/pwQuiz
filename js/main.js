
var questao = document.querySelector("h1");
var contar = 0; 
const tremer = document.querySelector(".tremer");

function quizAPI() {
    var request = new XMLHttpRequest()
    request.open('GET', 'https://opentdb.com/api.php?amount=10&category=15&difficulty=medium', true);
    request.onload = function () {
        quiz = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            jogar(contar);
        }else {
            alert(request.status)
        }
    }
    request.send();
}

var bt1 = document.getElementById("button1");
var bt2 = document.getElementById("button2");
var bt3 = document.getElementById("button3");
var bt4 = document.getElementById("button4");

function jogar(contar){

    questao.innerText = (quiz.results[contar].question);

    if (quiz.results[contar].type == "multiple"){
        bt1.innerText = (quiz.results[contar].correct_answer);
        bt2.innerText = (quiz.results[contar].incorrect_answers[0]);
        bt3.innerText = (quiz.results[contar].incorrect_answers[1]);
        bt4.innerText = (quiz.results[contar].incorrect_answers[2]);
    }else{
        bt1.innerText = (quiz.results[contar].correct_answer);
        bt2.innerText = (quiz.results[contar].incorrect_answers);
        bt3.style.display="none";
        bt4.style.display="none";
    }   


    bt1.addEventListener("click", acertou);
    bt2.addEventListener("click", acertou);
    bt3.addEventListener("click", acertou);
    bt4.addEventListener("click", acertou);   
    
   
       
}

var audioAcertar = document.getElementById("acertar");
var audioErrar = document.getElementById("errar");

function acertou(event) {

    switch (event.target.innerHTML) {
        
        case quiz.results[contar].correct_answer:
            audioAcertar.currentTime = 0;
            audioAcertar.volume = 0.4;
            audioAcertar.play();
            alert("Acertaste!");
            contar++;
            jogar(contar);
            break;
       
        default:
            audioErrar.currentTime = 0;
            audioErrar.volume = 0.15;
            audioErrar.play();
            
            alert("Errou!");
            contar++;
            jogar(contar);
            break;
    }
} 
