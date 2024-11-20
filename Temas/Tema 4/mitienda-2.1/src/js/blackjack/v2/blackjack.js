function Game() {
  // La función se invoca con el operador new
  if (!(this instanceof Game)) { throw new InvalidAccessConstructorException(); }

  // Definición de propiedades no configurables y de solo lectura.
  Object.defineProperty(this, 'player', {
    value: new Player('player1'),
    enumerable: true,
    writable: false,
    configurable: false,
  });
  Object.defineProperty(this, 'dealer', {
    value: new Dealer('dealer'),
    enumerable: true,
    writable: false,
    configurable: false,
  });
  Object.defineProperty(this, 'deck', {
    value: new Deck(4),
    enumerable: true,
    writable: false,
    configurable: false,
  });
}
Game.prototype.constructor = Game;
Game.prototype.playGame = function () {
  // Renovamos el mazo si estamos por encima del límite de cartas
  if (this.deck.upperLimit) this.deck.renewDeck();
  this.player.initPlay();
  this.dealer.initPlay();
  for (let i = 0; i < 2; i++) {
    this.player.addCard(this.deck.getNextCard());
    this.dealer.addCard(this.deck.getNextCard());
  }
};
Game.prototype.playPlayer = function () {
  this.player.addCard(this.deck.getNextCard());
};
Game.prototype.playDealer = function () {
  try {
    while (this.player.score <= 21
      && this.dealer.score < this.player.score) {
      this.dealer.addCard(this.deck.getNextCard());
    }
  } catch (upper21Exception) {
  }
};
Game.prototype.checkPlayerWinner = function () {
  return !!((this.player.score <= 21
    && (this.dealer.score > 21
      || this.player.score >= this.dealer.score)));
};
Game.prototype.checkDealerWinner = function () {
  return !!((this.dealer.score <= 21
    && (this.player.score > 21
      || this.dealer.score >= this.player.score)));
};

const game = new Game();

function test() {
  function cardTest() {
    const c1 = new Card(Card.suits[0], Card.values[0]);
    console.log(c1.toString()); // Corazón-A
    try {
      c1.suit = Card.suits[1];
    } catch (error) {
      // TypeError: Cannot assign to read only property 'suit' of object '[object Object]'
      console.log(error.toString());
    }
    try {
      c1.suit = Card.values[1];
    } catch (error) {
      // TypeError: Cannot assign to read only property 'suit' of object '[object Object]'
      console.log(error.toString());
    }
    try {
      const c2 = new Card('AAA', Card.values[0]);
    } catch (error) {
      // InvalidValueException: Error: The paramenter AAA has an invalid value. (AAA: suit)
      console.log(error.toString());
    }
    try {
      const c3 = new Card(Card.suits[0], 'AAA');
    } catch (error) {
      // InvalidValueException: Error: The paramenter AAA has an invalid value. (AAA: value)
      console.log(error.toString());
    }
  }

  function deckTest() {
    const deck = new Deck(4);
    deck.emptyDeck((card, index, upperLimit) => {
      console.log(`${index}: ${card.toString()} (${card.score}) ${upperLimit}`);
    });
  }

  function playerTest() {
    const deck = new Deck(4);
    const player = new Player('Player1');
    player.addCard(deck.getNextCard());
    player.addCard(deck.getNextCard());
    console.log(`Primera mano ${player.name}: ${player.showFirstRound()}`);
    try {
      while (true) {
        player.addCard(deck.getNextCard());
        console.log(`${player.cardsToString()}: ${player.score}`);
      }
    } catch (exception) {
      console.log(exception instanceof Upper21Exception); // true
      // Upper21Exception: The score is upper 21.
      console.log(exception.toString());
    }
    console.log(`${player.cardsToString()}: ${player.score}`);
    const dealer = new Dealer('Dealer');
    dealer.addCard(deck.getNextCard());
    dealer.addCard(deck.getNextCard());
    console.log(`Primera mano ${dealer.name}: ${dealer.showFirstRound()}`);
  }

  cardTest();
  deckTest();
  playerTest();
}
test();
