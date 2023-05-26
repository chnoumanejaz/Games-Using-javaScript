'use strict';

// getting Elements from HTML
const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');
const diceElement = document.querySelector('.dice');
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// message about game on start
const overlay = document.querySelector('.overlay');
const popup = document.querySelector('.popup');
const btnPlay = document.querySelector('.btn--play');

// variables to live outside and feed in the function 😉
let scores, currentScore, activePlayer, isPlaying, rollCount;
// initializing the game with base conditions
const initializeGame = function () {
  // Variables to store the data (scores)
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isPlaying = true;
  rollCount = 0;
  // starting conditions for the game
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;
  diceElement.classList.add('hidden');
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');
};

initializeGame();

// close the popup and start playing the game when button pressed (Play Game)
btnPlay.addEventListener('click', function(){
    overlay.classList.add('hideMessage');
    popup.classList.add('hideMessage');
})


// switching the player function
const swithThePlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

// rolling the dice functionality
btnRoll.addEventListener('click', function () {
  if (isPlaying) {
    rollCount = 1;
    document.querySelector('.message').classList.add('hidden');
    // Generating the Random dice number
    const diceNumber = Math.trunc(Math.random() * 6 + 1);

    // displaying the dice on the page
    diceElement.classList.remove('hidden');
    diceElement.src = `img/dice-${diceNumber}.png`;

    // adding the score to the player current scores
    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      // giving the control to the next player if the dice is 0
      swithThePlayer();
      rollCount = 0;
    }
  }
});

// holding the scores functionality
btnHold.addEventListener('click', function () {
  if (isPlaying) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    // finish condition on the 100 scores
    if (scores[activePlayer] >= 100) {
      isPlaying = false;
      diceElement.classList.add('hidden');
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      if (rollCount === 1) {
        swithThePlayer();
        rollCount = 0;
      } else {
        document.querySelector('.message').classList.remove('hidden');
      }
    }
  }
});

// restarting the game or new game
btnNew.addEventListener('click', initializeGame);
