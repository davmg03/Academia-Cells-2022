document.addEventListener('DOMContentLoaded', () => {
    //Obciones de cartas
    let cardArray = [
      {
        name: 'fries',
        img: './IMG/fries.png'
      },
      {
        name: 'cheeseburger',
        img: './IMG/cheeseburger.png'
      },
      {
        name: 'ice-cream',
        img: './IMG/ice-cream.png'
      },
      {
        name: 'pizza',
        img: './IMG/pizza.png'
      },
      {
        name: 'milkshake',
        img: './IMG/milkshake.png'
      },
      {
        name: 'hotdog',
        img: './IMG/hotdog.png'
      },
      {
        name: 'fries',
        img: './IMG/fries.png'
      },
      {
        name: 'cheeseburger',
        img: './IMG/cheeseburger.png'
      },
      {
        name: 'ice-cream',
        img: './IMG/ice-cream.png'
      },
      {
        name: 'pizza',
        img: './IMG/pizza.png'
      },
      {
        name: 'milkshake',
        img: './IMG/milkshake.png'
      },
      {
        name: 'hotdog',
        img: './IMG/hotdog.png'
      }];
    cardArray.sort(() => 0.5 - Math.random());
    let grid = document.querySelector('.grid');
    let resultDisplay = document.querySelector('#result');
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];
    //Crear los pares
    function createBoard() {
      for (let i = 0; i < cardArray.length; i++) {
        let card = document.createElement('img');
        card.setAttribute('src', './IMG/blank.png');
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
      }
    }
    //Checar las coincidencias 
    function checkForMatch() {
      let cards = document.querySelectorAll('img');
      let optionOneId = cardsChosenId[0];
      let optionTwoId = cardsChosenId[1];
      if(optionOneId == optionTwoId) {
        cards[optionOneId].setAttribute('src', './IMG/blank.png');
        cards[optionTwoId].setAttribute('src', './IMG/blank.png');
        alert('¡Has hecho clic en la misma imagen!');
      }
      else if (cardsChosen[0] === cardsChosen[1]) {
        alert('Encontraste una coincidencia');
        cards[optionOneId].setAttribute('src', './IMG/white.png');
        cards[optionTwoId].setAttribute('src', './IMG/white.png');
        cards[optionOneId].removeEventListener('click', flipCard);
        cards[optionTwoId].removeEventListener('click', flipCard);
        cardsWon.push(cardsChosen);
      } else {
        cards[optionOneId].setAttribute('src', './IMG/blank.png');
        cards[optionTwoId].setAttribute('src', './IMG/blank.png');
        alert('Perdón intente de nuevo');
      }
      cardsChosen = [];
      cardsChosenId = [];
      resultDisplay.textContent = cardsWon.length;
      if  (cardsWon.length === cardArray.length/2) {
        resultDisplay.textContent = '¡Felicidades! ¡Los encontraste todos!';
      }
    }
    // Voltea tu tarjeta
    function flipCard() {
      let cardId = this.getAttribute('data-id');
      cardsChosen.push(cardArray[cardId].name);
      cardsChosenId.push(cardId);
      this.setAttribute('src', cardArray[cardId].img);
      if (cardsChosen.length ===2) {
        setTimeout(checkForMatch, 500);
      }
    }
    createBoard();
  })