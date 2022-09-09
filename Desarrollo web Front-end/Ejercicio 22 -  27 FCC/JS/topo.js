let squares = document.querySelectorAll('.square');
let mole = document.querySelector('.mole');
let timeLeft = document.querySelector('#time-left');
let score = document.querySelector('#score');
let result = 0;
let hitPosition;
let currentTime = 60;
let timerId = null;
function randomSquare() {
  squares.forEach(square => {
    square.classList.remove('mole');
  });
  let randomSquare = squares[Math.floor(Math.random() * 9)];
  randomSquare.classList.add('mole');
  hitPosition = randomSquare.id;
}
squares.forEach(square => {
  square.addEventListener('mousedown', () => {
    if (square.id == hitPosition) {
      result++;
      score.textContent = result;
      hitPosition = null;
    }
  });
});
function moveMole() {
  timerId = setInterval(randomSquare, 500);
}
moveMole();
function countDown() {
 currentTime--;
 timeLeft.textContent = currentTime;
 if (currentTime == 0) {
   clearInterval(countDownTimerId);
   clearInterval(timerId);
   alert('¡Juego Terminado! Tú puntaje final es: ' + result);
 }
}
let countDownTimerId = setInterval(countDown, 1000);
