document.addEventListener('DOMContentLoaded', () => {
    let squares = document.querySelectorAll('.grid div');
    let scoreDisplay = document.querySelector('span');
    let startBtn = document.querySelector('.start');
    let width = 10;
    let currentIndex = 0; // Entonces primer div en nuestra grilla
    let appleIndex = 0; // Entonces primer div en nuestra grilla
    let currentSnake = [2,1,0];
    let direction = 1;
    let score = 0;
    let speed = 0.9;
    let intervalTime = 0;
    let interval = 0;
    // Para empezar y reiniciar el juego
    function startGame() {
      currentSnake.forEach(index => squares[index].classList.remove('snake'));
      squares[appleIndex].classList.remove('apple');
      clearInterval(interval);
      score = 0;
      randomApple();
      direction = 1;
      scoreDisplay.innerText = score;
      intervalTime = 1000;
      currentSnake = [2,1,0];
      currentIndex = 0;
      currentSnake.forEach(index => squares[index].classList.add('snake'));
      interval = setInterval(moveOutcomes, intervalTime);
    }
    // Función que se ocupa de TODOS los resultados de amor de la serpiente
    function moveOutcomes() {
      // Se ocupa de la serpiente que golpea el borde y la serpiente que se golpea a sí misma
      if (
        (currentSnake[0] + width >= (width * width) && direction === width ) || // Si la serpiente toca fondo
        (currentSnake[0] % width === width -1 && direction === 1) || // Si la serpiente golpea la pared derecha
        (currentSnake[0] % width === 0 && direction === -1) || // Si la serpiente golpea la pared izquierda
        (currentSnake[0] - width < 0 && direction === -width) ||  // Si la serpiente llega a la cima
        squares[currentSnake[0] + direction].classList.contains('snake') // Si la serpiente entra en sí misma
      ) {
        return clearInterval(interval); // Esto borrará el intervalo si ocurre algo de lo anterior
      }
      let tail = currentSnake.pop(); // Elimina el último elemento de la matriz y lo muestra
      squares[tail].classList.remove('snake');  // Quita clase de serpiente de la COLA
      currentSnake.unshift(currentSnake[0] + direction); // Da dirección a la cabeza de la matriz
      // Se ocupa de que la serpiente consiga una manzana
      if(squares[currentSnake[0]].classList.contains('apple')) {
        squares[currentSnake[0]].classList.remove('apple');
        squares[tail].classList.add('snake');
        currentSnake.push(tail);
        randomApple();
        score++;
        scoreDisplay.textContent = score;
        clearInterval(interval);
        intervalTime = intervalTime * speed;
        interval = setInterval(moveOutcomes, intervalTime);
      }
      squares[currentSnake[0]].classList.add('snake');
    }
    // Generar nueva manzana una vez que se come la manzana
    function randomApple() {
      do{
        appleIndex = Math.floor(Math.random() * squares.length);
      } while(squares[appleIndex].classList.contains('snake')) // Asegurándose de que las manzanas no aparezcan en la serpiente
      squares[appleIndex].classList.add('apple');
    }
    // Asignar funciones a códigos clave
    function control(e) {
      squares[currentIndex].classList.remove('snake');
      if(e.keyCode === 39) {
        direction = 1 // Si presionamos la flecha derecha en nuestro teclado, la serpiente irá a la derecha
      } else if (e.keyCode === 38) {
        direction = -width // Si presionamos la flecha hacia arriba, la serpiente retrocederá diez divs, pareciendo subir
      } else if (e.keyCode === 37) {
        direction = -1 // Si presionamos a la izquierda, la serpiente irá a la izquierda un div
      } else if (e.keyCode === 40) {
        direction = +width // Si presionamos hacia abajo, la cabeza de serpiente aparecerá instantáneamente en el div a diez divs de donde te encuentras ahora
      }
    }
    document.addEventListener('keyup', control);
    startBtn.addEventListener('click', startGame);
  })