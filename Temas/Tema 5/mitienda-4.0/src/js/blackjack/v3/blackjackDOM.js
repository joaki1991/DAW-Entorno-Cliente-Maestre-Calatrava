// DOM variables
const dealerDOM = {
  cards: document.getElementById('cards-dealer'),
  score: document.getElementById('score-dealer'),
  result: document.getElementById('result-dealer'),
};
const playerDOM = {
  cards: document.getElementById('cards-player'),
  score: document.getElementById('score-player'),
  result: document.getElementById('result-player'),
};
const playerButtons = document.getElementById('player-buttons');
const newGameButton = document.getElementById('new-game-button');
const stayButton = document.getElementById('stay-button');
const hitButton = document.getElementById('hit-button');
const counters = {
  gameCounter: document.getElementById('game-counter'),
  playerCounter: document.getElementById('player-counter'),
  dealerCounter: document.getElementById('dealer-counter'),
};

function cleanGame() {
  dealerDOM.cards.innerHTML = '';
  dealerDOM.score.innerHTML = '';
  dealerDOM.result.innerHTML = '';
  playerDOM.cards.innerHTML = '';
  playerDOM.score.innerHTML = '';
  playerDOM.result.innerHTML = '';
}

function showGameButtons() {
  newGameButton.classList.add('d-none');
  playerButtons.classList.remove('d-none');
}
function hideGameButtons() {
  newGameButton.classList.remove('d-none');
  playerButtons.classList.add('d-none');
}

// Mostrar los estados quedad dividido para el dealer, el player y la ronda inicial.
// Conseguimos no mostrar todas las cartas del dealer a lo largo de la partida.
function showStatusPlayer() {
  playerDOM.cards.innerHTML = game.player.cardsToString();
  playerDOM.score.innerHTML = game.player.score;
}

function showStatusDealer() {
  dealerDOM.cards.innerHTML = game.dealer.cardsToString();
  dealerDOM.score.innerHTML = game.dealer.score;
}

function showInitStatus() {
  playerDOM.cards.innerHTML = game.player.showFirstRound();
  playerDOM.score.innerHTML = game.player.score;
  dealerDOM.cards.innerHTML = game.dealer.showFirstRound();
  dealerDOM.score.innerHTML = '-';
}

function showWinners() {
  showStatusPlayer();
  showStatusDealer();
  playerDOM.result.innerHTML = game.checkPlayerWinner() ? 'Ganador' : 'Perdedor';
  dealerDOM.result.innerHTML = game.checkDealerWinner() ? 'Ganador' : 'Perdedor';
  counters.gameCounter.innerHTML = game.gameCounter;
  counters.playerCounter.innerHTML = game.player.winCounter;
  counters.dealerCounter.innerHTML = game.dealer.winCounter;
}

newGameButton.addEventListener('click', () => {
  cleanGame();
  game.playGame();
  // Ningún jugador en la mesa tiene BlackJack
  if (!game.dealer.checkBlackJack() && !game.player.checkBlackJack()) {
    showGameButtons();
    showInitStatus();
  } else { // Un jugador tiene BlackJack
    // Jugador tiene BlackJack dejamos que juegue el dealer
    if (game.player.checkBlackJack()) {
      game.playDealer();
    }
    // La partida finaliza independientemente del tipo del BlackJack
    showWinners();
    hideGameButtons();
  }
});

hitButton.addEventListener('click', () => {
  try {
    game.playPlayer();
    showStatusPlayer();
  } catch (upper21Exception) {
    game.playDealer();
    showWinners();
    hideGameButtons();
  }
});

stayButton.addEventListener('click', () => {
  game.playDealer();
  showWinners();
  hideGameButtons();
});
