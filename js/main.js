
var questao = document.querySelector("h1");
var contar = 0;
const tremer = document.querySelector(".tremer");
var categoria, dificuldade, nome;


function quizAPI() {
    var request = new XMLHttpRequest()
    request.open('GET', 'https://opentdb.com/api.php?amount=10&category=' + categoria + '&difficulty=' + dificuldade, true);
    request.onload = function () {
        quiz = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            jogar(contar);
            startTimer();
        } else {
            alert(request.status)
        }
    }
    request.send();
}

var bt1 = document.getElementById("button1");
var bt2 = document.getElementById("button2");
var bt3 = document.getElementById("button3");
var bt4 = document.getElementById("button4");


function jogar(contar) {

    bt1.style.backgroundColor = "#474e5d";
    bt2.style.backgroundColor = "#474e5d";
    bt3.style.backgroundColor = "#474e5d";
    bt4.style.backgroundColor = "#474e5d";
    questao.innerHTML = (quiz.results[contar].question);

    if (quiz.results[contar].type == "multiple") {
        
        var perguntas=quiz.results[contar].incorrect_answers;
        perguntas.push(quiz.results[contar].correct_answer);
        var aleatorio = perguntas.sort(() => Math.random() - 0.5);
        bt3.style.display = "block";
        bt4.style.display = "block";
        bt1.innerHTML=aleatorio[0];
        bt2.innerHTML = aleatorio[1];
        bt3.innerHTML = aleatorio[2];
        bt4.innerHTML = aleatorio[3];

    } else {
        bt1.innerHTML = (quiz.results[contar].correct_answer);
        bt2.innerHTML = (quiz.results[contar].incorrect_answers);
        bt3.style.display = "none";
        bt4.style.display = "none";
    }


    bt1.addEventListener("click", acertou);
    bt2.addEventListener("click", acertou);
    bt3.addEventListener("click", acertou);
    bt4.addEventListener("click", acertou);



}

var audioAcertar = document.getElementById("acertar");
var audioErrar = document.getElementById("errar");

var pontos = 0;

function acertou(event) {

    switch (event.target.innerHTML) {

        case quiz.results[contar].correct_answer:
            pontos += 10;
            audioAcertar.currentTime = 0;
            audioAcertar.volume = 0.4;
            audioAcertar.play();
            /* bt1.style.backgroundColor = "green";
            bt1.disable = true;
            bt2.style.backgroundColor = "red";
            bt2.disable = true;
            bt3.style.backgroundColor = "red";
            bt3.disable = true;
            bt4.style.backgroundColor = "red";
            bt4.disable = true; */

            setTimeout(function () { contar++; jogar(contar); }, 1500);
            break;

        default:
            audioErrar.currentTime = 0;
            audioErrar.volume = 0.15;
            audioErrar.play();
           /*  bt1.style.backgroundColor = "green";
            bt1.disable = true;
            bt2.style.backgroundColor = "red";
            bt2.disable = true;
            bt3.style.backgroundColor = "red";
            bt3.disable = true;
            bt4.style.backgroundColor = "red";
            bt4.disable = true; */
            setTimeout(function () { contar++; jogar(contar); }, 1500);

            break;
    }
}

/*  document.getElementById('timer').innerHTML =
  000 + ":" + 20;


function startTimer() {
  var presentTime = document.getElementById('timer').innerHTML;
  var timeArray = presentTime.split(/[:]+/);
  var m = timeArray[0];
  var s = checkSecond((timeArray[1] - 1));
  if(s==59){m=m-1}
  if(m=0){alert('timer completed')}
  
  document.getElementById('timer').innerHTML =
   m + ":" + s;
  console.log(m)
  setTimeout(startTimer, 1000);
}
function checkSecond(sec) {
    if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
    if (sec < 0) {sec = "59"};
    return sec;
  }  */
var semtempo = document.getElementById("myModal");
$(function () {
    document.getElementById('timer').innerHTML =
        00 + ":" + 15;
});

function startTimer() {
    var presentTime = document.getElementById('timer').innerHTML;
    var timeArray = presentTime.split(/[:]+/);
    var m = timeArray[0];
    var s = checkSecond((timeArray[1] - 1));
    if (s == 59) { m = m - 1 }

    if (m < 0) {
        m = 0;
        s = "0" + 0;
        // abrir modal
        $('#myModal').modal("show");
        document.getElementById('pontos').innerHTML = pontos;
    }

    document.getElementById('timer').innerHTML =
        m + ":" + s;

    setTimeout(startTimer, 1000);

}

function checkSecond(sec) {
    if (sec < 10 && sec >= 0) { sec = "0" + sec }; // add zero in front of numbers < 10
    if (sec < 0) { sec = "59" };

    return sec;

}


//seleciona categoria

function selecionarCategoria(id) {
    document.getElementById(id).classList.add("borda");
    if (categoria) {
        document.getElementById(categoria).classList.remove("borda");
    }

    categoria = id;
}

function selecionarDificuldade(id) {
    if (dificuldade) {
        document.getElementById(dificuldade).classList.remove("btnclick" + dificuldade);
        document.getElementById(id).classList.add("btnclick" + id);

    } else {
        document.getElementById(id).classList.add("btnclick" + id);
    }

    dificuldade = id;
}

document.getElementById("jogar").addEventListener("click", () => {
    nome = document.getElementById("nome").value;

    if (categoria && dificuldade && nome) {
        document.getElementById("inicio").style.display = "none";
        document.getElementById("jogo").style.display = "block";
        quizAPI();
    } else {
        alert("Selecione !");
    }

})