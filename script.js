const cards = document.querySelectorAll('.memory-card');
const button = document.querySelector('#startGame');
const title = document.querySelector('.letters');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

button.onclick = function () {
   for (let i = 0; i < cards.length; i++) {
    cards[i].style.opacity = "1";
    cards[i].classList.remove('flip');
    button.style.display = "none";
    title.style.display = "none";
  }


  document.querySelector('#time').style.opacity = "1";

  let Minutes = 60 * 1,
    display = document.querySelector('#time');
  startTimer(Minutes, display);

  transposition();
  cards.forEach(card => card.addEventListener('click', flipCard));
}

function transposition(){
  cards.forEach(card => {
    let ramdomPos = Math.floor(Math.random() * 16);
    card.style.order = ramdomPos;
    });
}

function startTimer(duration, display) {
  let timer = duration,
    minutes, seconds;
  let timerId = setInterval(function () {
    minutes = parseInt(timer / 60, 10)
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    let flippedCard = document.querySelectorAll('.flip');
    if(flippedCard.length==cards.length) {
      clearInterval(timerId);
      for (let i = 0; i < cards.length; i++) {
        cards[i].style.opacity = "0";
        button.style.display = "block";
        title.style.display = "block";
    }
    } else
    if (--timer < 0) {
      clearInterval(timerId);
      document.getElementById("time").innerHTML = "Время вышло!";
      for (let i = 0; i < cards.length; i++) {
        cards[i].style.opacity = "0";
        button.style.display = "block";
        title.style.display = "block";
      }
    }
  }, 1000);
}



function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  if (firstCard.dataset.p === secondCard.dataset.p) {
    disableCards();
    return;
  }

  unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}


function resetBoard() {
  hasFlippedCard = false;
  lockBoard = false;
  firstCard = false;
  secondCard = false;
}
