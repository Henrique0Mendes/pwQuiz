var timeout, timer;

startChrono(3*60*1000); //3 min

function startChrono (milisec) {
  timeout = (new Date()).getTime() + milisec;

  timer = setInterval("tick()", 1000);
}

function tick () {
  var now = (new Date()).getTime();
  var diff = now - timeout;

  if (diff <= 0) {
    clearInterval(timer); 
    diff = 0;
  }

  render(diff);
}

function render (milisec) {
  var sec = Math.floor(milisec / 1000);
  var min = Math.floor(milisec / 60);
  sec = sec - (min*60);

  document.getElementById("minutes").value = sec;
  document.getElementById("seconds").value = min;
}
