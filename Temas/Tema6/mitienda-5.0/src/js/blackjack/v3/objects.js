function Card(suit, value) {
  // La función se invoca con el operador new
  if (!(this instanceof Card)) { throw new InvalidAccessConstructorException(); }

  // Validación de argumentos de entrada
  if (Card.suits.indexOf(suit) === -1) { throw new InvalidValueException(suit, 'suit'); }
  if (Card.values.indexOf(value) === -1) { throw new InvalidValueException(value, 'value'); }

  // Definición de propiedades no configurables y de solo lectura.
  Object.defineProperty(this, 'suit', {
    value: suit,
    enumerable: true,
    writable: false,
    configurable: false,
  });

  Object.defineProperty(this, 'value', {
    value,
    enumerable: true,
    writable: false,
    configurable: false,
  });

  let _score = 0;
  switch (value) {
    case 'A':
      _score = 11;
      break;
    case 'K': case 'Q': case 'J':
      _score = 10;
      break;
    default: _score = +value;
  }
  Object.defineProperty(this, 'score', {
    value: _score,
    enumerable: true,
    writable: false,
    configurable: false,
  });
}
Card.prototype.constructor = Card;
Card.prototype.toString = function () {
  return `${this.suit}-${this.value}`;
};

Card.suits = ['Corazón', 'Trébol', 'Diamante', 'Pica'];
Card.values = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];

function Deck(num = 1) {
  // La función se invoca con el operador new
  if (!(this instanceof Deck)) { throw new InvalidAccessConstructorException(); }

  // Campos privados
  const _num = num;
  let _deck;
  let _upperLimit = false;
  const _limit = Math.trunc(Card.suits.length * Card.values.length * _num * 0.2);

  createDeck();
  shuffleDeck();

  Object.defineProperty(this, 'upperLimit', {
    get() {
      return _upperLimit;
    },
  });

  this.getNextCard = function () {
    if (_deck.length <= _limit) {
      _upperLimit = true;
    }
    return _deck.pop();
  };

  this.renewDeck = function () {
    createDeck();
    shuffleDeck();
  };

  this.emptyDeck = function (callback) {
    let index = 0;
    while (_deck.length > 0) {
      callback(this.getNextCard(), ++index, this.upperLimit);
    }
  };

  function createDeck() {
    _deck = [];
    for (let i = 0; i < _num; i++) {
      for (let suitIdx = 0; suitIdx < Card.suits.length; suitIdx++) {
        for (let valueIdx = 0; valueIdx < Card.values.length; valueIdx++) {
          const card = new Card(Card.suits[suitIdx], Card.values[valueIdx]);
          _deck.push(card);
        }
      }
    }
  }

  function shuffleDeck() {
    for (let i = 0; i < _deck.length; i++) {
      const swapIdx = Math.trunc(Math.random() * _deck.length);
      const tmp = _deck[swapIdx];
      _deck[swapIdx] = _deck[i];
      _deck[i] = tmp;
    }
  }
}
Deck.prototype.constructor = Deck;

(function () {
  let abstractCreateLock = true;
  function TablePlayer(name) {
    if (abstractCreateLock) { throw new Error("You can't instantiate TablePlayer!"); }
    abstractCreateLock = true;

    // La función se invoca con el operador new
    if (!(this instanceof TablePlayer)) { throw new InvalidAccessConstructorException(); }

    // Validación de argumentos de entrada
    if (!name) throw new InvalidValueException(name, 'name');

    // Campos privados
    const _cards = [];
    let _score = 0;
    let _winCounter = 0;

    // Propiedades públicas
    Object.defineProperty(this, 'name', {
      value: name,
      enumerable: true,
      writable: false,
      configurable: false,
    });

    Object.defineProperty(this, 'cards', {
      get() {
        let nextIndex = 0;
        return {
          next() {
            return nextIndex < _cards.length
              ? { value: _cards[nextIndex++], done: false }
              : { done: true };
          },
        };
      },
    });

    Object.defineProperty(this, 'score', {
      get() {
        return _score;
      },
    });
    Object.defineProperty(this, 'winCounter', {
      get() {
        return _winCounter;
      },
      set(value) {
        _winCounter = value;
      },
    });

    this.initPlay = function () {
      _cards.length = 0;
    };

    this.addCard = function (card) {
      if (!card instanceof Card) throw new NullCardException();
      _cards.push(card);
      _score = this.getScore();
      // Chequeo de puntuación.
      if (this.score > 21) throw new Upper21Exception();
      return _cards.length;
    };

    this.checkBlackJack = function () {
      return (_cards.length === 2 && this.score === 21);
    };

    this.getScore = function () {
      let score = 0;
      let hasAce = 0;
      for (let i = 0; i < _cards.length; i++) {
        score += _cards[i].score;
        if (_cards[i].value === 'A') {
          hasAce++;
        }
      }
      while (hasAce > 0 && score > 21) {
        score -= 10;
        hasAce--;
      }
      return score;
    };

    this.cardsToString = function () {
      return _cards.join(';');
    };
  }
  TablePlayer.prototype.constructor = TablePlayer;
  TablePlayer.prototype.showFirstRound = function () {
    return this.cardsToString();
  };

  function Player(name) {
  // La función se invoca con el operador new
    if (!(this instanceof Player)) { throw new InvalidAccessConstructorException(); }
    abstractCreateLock = false;
    TablePlayer.call(this, name);
  }
  Player.prototype.constructor = Player;
  Player.prototype = Object.create(TablePlayer.prototype);

  function Dealer(name) {
  // La función se invoca con el operador new
    if (!(this instanceof Dealer)) { throw new InvalidAccessConstructorException(); }
    abstractCreateLock = false;
    TablePlayer.call(this, name);
  }
  Dealer.prototype.constructor = Dealer;
  Dealer.prototype = Object.create(TablePlayer.prototype);
  Dealer.prototype.showFirstRound = function () {
    return this.cards.next().value;
  };

  window.TablePlayer = TablePlayer;
  window.Player = Player;
  window.Dealer = Dealer;
}());
