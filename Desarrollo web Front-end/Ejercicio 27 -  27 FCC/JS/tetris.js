document.addEventListener('DOMContentLoaded', () => {
    // TODO: también podemos obtener el tamaño de la cuadrícula del usuario
    let GRID_WIDTH = 10;
    let GRID_HEIGHT = 20;
    let GRID_SIZE = GRID_WIDTH * GRID_HEIGHT;
    // No es necesario escribir 200 divs :)
    let grid = createGrid();
    let squares = Array.from(grid.querySelectorAll('div'));
    let startBtn = document.querySelector('.button');
    let hamburgerBtn = document.querySelector('.toggler');
    let menu = document.querySelector('.menu');
    let span = document.getElementsByClassName('close')[0];
    let scoreDisplay = document.querySelector('.score-display');
    let linesDisplay = document.querySelector('.lines-score');
    let currentIndex = 0;
    let currentRotation = 0;
    let width = 10;
    let score = 0;
    let lines = 0;
    let timerId;
    let nextRandom = 0;
    let colors = [
      'url(./IMG/blue_block.png)',
      'url(./IMG/pink_block.png)',
      'url(./IMG/purple_block.png)',
      'url(./IMG/peach_block.png)',
      'url(./IMG/yellow_block.png)'];
    function createGrid() {
      // La red principal
      let grid = document.querySelector(".grid");
      for (let i = 0; i < GRID_SIZE; i++) {
        let gridElement = document.createElement("div");
        grid.appendChild(gridElement);
      }
      // Establecer la base de la cuadrícula
      for (let i = 0; i < GRID_WIDTH; i++) {
        let gridElement = document.createElement("div");
        gridElement.setAttribute("class", "block3");
        grid.appendChild(gridElement);
      }
      let previousGrid = document.querySelector(".previous-grid");
      // Dado que 16 es el tamaño máximo de cuadrícula en el que todos los Tetrominoes
      // puede caber creamos uno aquí
      for (let i = 0; i < 16; i++) {
        let gridElement = document.createElement("div");
        previousGrid.appendChild(gridElement);
      }
      return grid;
    }
    // Asignar funciones a códigos clave
    function control(e) {
      if (e.keyCode === 39)
        moveright()
      else if (e.keyCode === 38)
        rotate()
      else if (e.keyCode === 37)
        moveleft()
      else if (e.keyCode === 40)
        moveDown()
    }
    // El comportamiento clásico es acelerar el bloque si se mantiene presionado el botón de abajo para hacerlo
    document.addEventListener('keydown', control);
    //Los tetrominoes
    let lTetromino = [
      [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, 2],
      [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 2],
      [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2],
      [GRID_WIDTH, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2 + 2]
    ];
    let zTetromino = [
      [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
      [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1],
      [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
      [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1]
    ];
    let tTetromino = [
      [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2],
      [1, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
      [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
      [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1]
    ];
    let oTetromino = [
      [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
      [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
      [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
      [0, 1, GRID_WIDTH, GRID_WIDTH + 1]
    ];
    let iTetromino = [
      [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
      [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3],
      [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
      [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3]
    ];
    let theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];
    //Seleccionar aleatoriamente Tetromino
    let random = Math.floor(Math.random() * theTetrominoes.length);
    let current = theTetrominoes[random][currentRotation];
    // Mover el Tetromino mover hacia abajo
    let currentPosition = 4;
    // Dibujar la forma
    function draw() {
      current.forEach(index => {
        squares[currentPosition + index].classList.add('block');
        squares[currentPosition + index].style.backgroundImage = colors[random];
      })
    }
    // Desdibujar la forma
    function undraw() {
      current.forEach(index => {
        squares[currentPosition + index].classList.remove('block');
        squares[currentPosition + index].style.backgroundImage = 'none';
      })
    }
    // Mover hacia abajo en bucle
    function moveDown() {
      undraw();
      currentPosition = currentPosition += width;
      draw();
      freeze();
    }
    startBtn.addEventListener('click', () => {
      if (timerId) {
        clearInterval(timerId);
        timerId = null;
      } else {
        draw();
        timerId = setInterval(moveDown, 1000);
        nextRandom = Math.floor(Math.random() * theTetrominoes.length);
        displayShape();
      }
    })
    // Moverse a la izquierda y evitar colisiones con formas que se mueven a la izquierda
    function moveright() {
      undraw();
      let isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1);
      if (!isAtRightEdge) currentPosition += 1
      if (current.some(index => squares[currentPosition + index].classList.contains('block2'))) {
        currentPosition -= 1;
      }
      draw();
    }
    // Moverse a la derecha y evitar colisiones con formas que se mueven a la derecha
    function moveleft() {
      undraw();
      let isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);
      if (!isAtLeftEdge) currentPosition -= 1
      if (current.some(index => squares[currentPosition + index].classList.contains('block2'))) {
        currentPosition += 1
      }
      draw();
    }
    // Congelar la forma
    function freeze() {
      // Si el bloque se ha asentado
      if (current.some(index => squares[currentPosition + index + width].classList.contains('block3') || squares[currentPosition + index + width].classList.contains('block2'))) {
        // Hazlo block2
        current.forEach(index => squares[index + currentPosition].classList.add('block2'));
        // Empieza un nuevo tetromino cayendo
        random = nextRandom;
        nextRandom = Math.floor(Math.random() * theTetrominoes.length);
        current = theTetrominoes[random][currentRotation];
        currentPosition = 4;
        draw();
        displayShape();
        addScore();
        gameOver();
      }
    }
    freeze();
    // Rotar el Tetromino
    function rotate() {
      undraw();
      currentRotation++;
      if (currentRotation === current.length) {
        currentRotation = 0;
      }
      current = theTetrominoes[random][currentRotation];
      draw();
    }
    // Juego perdido
    function gameOver() {
      if (current.some(index => squares[currentPosition + index].classList.contains('block2'))) {
        scoreDisplay.innerHTML = 'FIN';
        clearInterval(timerId);
      }
    }
    // Mostrar tetromino anterior en scoreDisplay
    let displayWidth = 4;
    let displaySquares = document.querySelectorAll('.previous-grid div');
    let displayIndex = 0;
    let smallTetrominoes = [
      [1, displayWidth + 1, displayWidth * 2 + 1, 2], /* lTetromino */
      [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], /* zTetromino */
      [1, displayWidth, displayWidth + 1, displayWidth + 2], /* tTetromino */
      [0, 1, displayWidth, displayWidth + 1], /* oTetromino */
      [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] /* iTetromino */
    ];
    function displayShape() {
      displaySquares.forEach(square => {
        square.classList.remove('block');
        square.style.backgroundImage = 'none';
      });
      smallTetrominoes[nextRandom].forEach(index => {
        displaySquares[displayIndex + index].classList.add('block');
        displaySquares[displayIndex + index].style.backgroundImage = colors[nextRandom];
      });
    }
    // Agregar Puntaje
    function addScore() {
      for (currentIndex = 0; currentIndex < GRID_SIZE; currentIndex += GRID_WIDTH) {
        let row = [currentIndex, currentIndex + 1, currentIndex + 2, currentIndex + 3, currentIndex + 4, currentIndex + 5, currentIndex + 6, currentIndex + 7, currentIndex + 8, currentIndex + 9];
        if (row.every(index => squares[index].classList.contains('block2'))) {
          score += 10;
          lines += 1;
          scoreDisplay.innerHTML = score;
          linesDisplay.innerHTML = lines;
          row.forEach(index => {
            squares[index].style.backgroundImage = 'none';
            squares[index].classList.remove('block2') || squares[index].classList.remove('block');
          })
          // Matriz de empalme
          let squaresRemoved = squares.splice(currentIndex, width);
          squares = squaresRemoved.concat(squares);
          squares.forEach(cell => grid.appendChild(cell));
        }
      }
    }
    // Dar estilo a eventListeners
    hamburgerBtn.addEventListener('click', () => {
      menu.style.display = 'flex';
    });
    span.addEventListener('click', () => {
      menu.style.display = 'none';
    });
  });