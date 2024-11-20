/* eslint-disable max-classes-per-file */

import {
  BaseException,
  InvalidAccessConstructorException,
  EmptyValueException,
  InvalidValueException,
  AbstractClassException,
  Upper21Exception,
} from './exceptions.js';

class Card {
  constructor(suit, value) {
    if (!new.target) throw new InvalidAccessConstructorException();
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

    let score;
    switch (value) {
      case 'A':
        score = 11;
        break;
      case 'K': case 'Q': case 'J':
        score = 10;
        break;
      default: score = +value;
    }

    Object.defineProperty(this, 'score', {
      value: score,
      enumerable: true,
      writable: false,
      configurable: false,
    });
  }

  toString() {
    return `${this.suit}-${this.value}`;
  }

  static get suits() {
    return ['Corazón', 'Trébol', 'Diamante', 'Pica'];
  }

  static get values() {
    return ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];
  }
}

class Deck {
  #num;

  #deck;

  #upperLimit = false;

  #limit;

  #createDeck() {
    this.#deck = [];
    for (let i = 0; i < this.#num; i++) {
      for (let suitIdx = 0; suitIdx < Card.suits.length; suitIdx++) {
        for (let valueIdx = 0; valueIdx < Card.values.length; valueIdx++) {
          const card = new Card(Card.suits[suitIdx], Card.values[valueIdx]);
          this.#deck.push(card);
        }
      }
    }
  }

  #shuffleDeck() {
    for (let i = 0; i < this.#deck.length; i++) {
      const swapIdx = Math.trunc(Math.random() * this.#deck.length);
      const tmp = this.#deck[swapIdx];
      this.#deck[swapIdx] = this.#deck[i];
      this.#deck[i] = tmp;
    }
  }

  constructor(num = 1) {
    if (!new.target) throw new InvalidAccessConstructorException();
    this.#num = num;
    this.#limit = Math.trunc(Card.suits.length * Card.values.length * this.#num * 0.2);
    this.#createDeck();
    this.#shuffleDeck();
  }

  get upperLimit() {
    return this.#upperLimit;
  }

  getNextCard() {
    if (this.#deck.length <= this.#limit) {
      this.#upperLimit = true;
    }
    return this.#deck.pop();
  }

  renewDeck() {
    this.#createDeck();
    this.#shuffleDeck();
  }

  emptyDeck(callback) {
    let index = 0;
    while (this.#deck.length > 0) {
      callback(this.getNextCard(), ++index, this.upperLimit);
    }
  }
}

class TablePlayer {
  #cards = [];

  #score = 0;

  #winCounter = 0;

  #getScore() {
    let score = 0;
    let hasAce = 0;
    for (let i = 0; i < this.#cards.length; i++) {
      score += this.#cards[i].score;
      if (this.#cards[i].value === 'A') {
        hasAce++;
      }
    }
    while (hasAce > 0 && score > 21) {
      score -= 10;
      hasAce--;
    }
    return score;
  }

  constructor(name) {
    if (!new.target) throw new InvalidAccessConstructorException();
    if (new.target === TablePlayer) throw new Error("You can't instantiate TablePlayer!");

    if (!name) throw new InvalidValueException(name, 'name');
    Object.defineProperty(this, 'name', {
      value: name,
      enumerable: true,
      writable: false,
      configurable: false,
    });
  }

  get cards() {
    const array = this.#cards;
    function* cardsGenerator() {
      for (const card of array) {
        yield card;
      }
    }
    return cardsGenerator();
  }

  get score() {
    return this.#score;
  }

  get winCounter() {
    return this.#winCounter;
  }

  set winCounter(value) {
    this.#winCounter = value;
  }

  initPlay() {
    this.#cards.length = 0;
  }

  addCard(card) {
    if (!card instanceof Card) throw new NullCardException();
    this.#cards.push(card);
    this.#score = this.#getScore();
    // Chequeo de puntuación.
    if (this.score > 21) throw new Upper21Exception();
    return this.#cards.length;
  }

  checkBlackJack() {
    return (this.#cards.length === 2 && this.score === 21);
  }

  cardsToString() {
    return this.#cards.join(';');
  }

  showFirstRound() {
    return this.cardsToString();
  }
}

class Player extends TablePlayer {
  #winnigPlays = 0;

  constructor(name) {
    if (!new.target) throw new InvalidAccessConstructorException();
    super(name);
  }
}

class Dealer extends TablePlayer {
  constructor(name) {
    if (!new.target) throw new InvalidAccessConstructorException();
    super(name);
  }

  showFirstRound() {
    return this.cards.next().value;
  }
}

export {
  Card, Deck, TablePlayer, Player, Dealer,
};
