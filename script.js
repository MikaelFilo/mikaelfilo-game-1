'use strict';

// Selecting elements
let score0El = document.querySelector('#score--0'); // score ne total
let score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0'); // sa pike ka marre aktualisht, te kutia current
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0'); // do te na ndihmoje qe te ndryshojme backgroundin
const player1El = document.querySelector('.player--1');

// Starting conditions
// score0El.textContent = 0;
// score1El.textContent = 0;
// diceEl.classList.add('hidden');

// These variables lives here and in the init() function we only reassign them
let scores; // the scores of player 1 will be at 0 index and the scores of player 2 will be at 1 index. array is 0 based
let currentScore; // cannot be inside the function because we roll the dice so many times
let activePlayer;
let playing; // in the beginning of the game we are of course, playing, we want false when somebody wins, this is a state variable

// // Function initialization, that serves as a reusable piece of code
// // Duam ta perdorim kete kod te funksionit kur nisim lojen per here te pare ose kur shtypim butonin new game
const init = function () {
  diceEl.classList.add('hidden');
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  // Visible part, part of new game button
  // Total score = 0
  score0El.textContent = 0;
  score1El.textContent = 0;
  // Current score = 0
  current0El.textContent = 0;
  current1El.textContent = 0;
  // Only one will be the winner, but no problem removing from both
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  // Player 0 should be the active player
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

// Switch to the next player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0; // sa pike ka aktualisht lojtari, ka zero sepse e fillon hedhjen e zarit te ri me 0 pike aktualisht
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; // Nese aktiv players do jete 0, ne do e nderrojme, pra do jete 1, nese do jete 1, ne do e nderrojme, pra do jete 0. prandaj jemi duke bere switch to next player, sepse dice === 1
  player0El.classList.toggle('player--active'); // remove the class: player-active if it is at player 0 and if it is not it will add it to the same player, so player 0
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //  e kemi inicializuar true ne fillim si variabel, eshte nje boolean
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //console.log(dice);
    // 2. Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`; // we set at to a string, that string is a template literal
    // 3. Check for rolled 1: if true
    if (dice !== 1) {
      // Add dice to current score
      currentScore = currentScore + dice; // currentScore += dice;
      //current0El.textContent = currentScore; // Change later
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});
// if (btnHold) {
// kete if block e pashe ne stackoverflow sepse pa ate me jepte nje bug
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score (total score)
    scores[activePlayer] += currentScore; // when it is player 0 -> it will be score 0, punojme me array ne index 0, when it is player 1 -> it will be score 1. ose ndryshe ne rreshtin me poshte, ne koment:
    //scores[1] = scores[1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if player's score is >= 100

    if (scores[activePlayer] >= 100) {
      // 3. Finish the game
      playing = false; // heren tjeter kur te klikojme mbi butona, ato nuk do te reagojne sepse playing tani do jete false, pasi ka dal nje fitues
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // 4. Switch to the next player
      switchPlayer();
    }
  }
});
// }

// New game - Button sipas kursit
// btnNew.addEventListener('click', init);

// New game - Button sipas kursit dhe vendosja e init function sipas meje
btnNew.addEventListener('click', function () {
  init();
  console.log('You just asked to play again!');
});

///////////////////////////////////////////////////////////
// Set current year
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

