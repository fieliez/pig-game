"use strict";

// Selecting Elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;

// Game starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
// calling the function
init();

const switchPlayer = function () {
  if (playing) {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
  }
};

// Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    //1, generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2, display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `images/dice-${dice}.png`;

    //3, check for roll 1, !==1 add dice to current score
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      //switch to next player
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //1, add current score to active player
    scores[activePlayer] += currentScore; //  scores[1] = scores[1] + currentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
  }
  //2,check if player score is >= 100
  if (scores[activePlayer] >= 100) {
    //finish the game
    playing = false;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--winner");
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove("player--active");
    diceEl.classList.add("hidden");
  } else {
    switchPlayer();
  }
});
//reset the Game
btnNew.addEventListener("click", init);

//.......before refactoring .......////
// switch player before refactoring code
// if (activePlayer === 0) {
//     activePlayer = 1;

//     player0El.classList.remove("player--active");
//     player1El.classList.add("player--active");
//   } else {
//     activePlayer = 0;

//     player1El.classList.remove("player--active");
//     player0El.classList.add("player--active");
//   }

//reset the Game
// btnNew.addEventListener("click", function () {
//   document
//     .querySelector(`.player--${activePlayer}`)
//     .classList.remove("player--winner");
//   document
//     .querySelector(`.player--${activePlayer}`)
//     .classList.remove("player--active");
//   document.querySelector(".player--0").classList.add("player--active");
//   score0El.textContent = 0;
//   score1El.textContent = 0;
//   current0El.textContent = 0;
//   current1El.textContent = 0;
//   diceEl.classList.add("hidden");
//   scores = [0, 0];
//   currentScore = 0;
//   activePlayer = 0;
//   playing = true;
// });
