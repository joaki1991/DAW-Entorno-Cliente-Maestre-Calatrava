"use strict";
/* BlackJack */

const Game = (function (){
	let instantiated = null;

	function init(){

		class Game {
			#playsNumber = 0;
			constructor(){
				if (!new.target) throw new InvalidAccessConstructorException();

				Object.defineProperty(this, "player", {
					value: new Player("player1"),
					enumerable: true,
					writable: false,
					configurable: false
				});
				Object.defineProperty(this, "dealer", {
					value: new Dealer("dealer"),
					enumerable: true,
					writable: false,
					configurable: false
				});
				Object.defineProperty(this, "deck", {
					value: new Deck(4),
					enumerable: true,
					writable: false,
					configurable: false
				});
			}

			get playsNumber(){
				return this.#playsNumber;
			}

			playGame () {
				// Renovamos el mazo si estamos por encima del límite de cartas
				if (this.deck.upperLimit) this.deck.renewDeck();
				game.player.initPlay();
				game.dealer.initPlay();
				this.#playsNumber++;
				for (let i = 0; i < 2; i++){
					game.player.addCard(game.deck.getNextCard());
					game.dealer.addCard(game.deck.getNextCard());
				}
			}

			playPlayer () {
				game.player.addCard(game.deck.getNextCard());
			}

			playDealer () {
				try {
					while (game.dealer.score < 17){
						game.dealer.addCard(game.deck.getNextCard());
					}
				} catch(upper21Exception){
				}
				//Actualizamos las partidas ganadas
				this.saveWinners();
			}

			checkPlayerWinner () {
				return (game.player.score <= 21 &&
					(game.dealer.score > 21 ||
						game.player.score >= game.dealer.score))? true : false;
			}

			checkDealerWinner () {
				return (game.dealer.score <= 21 &&
					(game.player.score > 21 ||
						game.dealer.score >= game.player.score))? true : false;
			}

			saveWinners (){
				if (game.player.score <= 21 && (game.dealer.score > 21 ||	game.player.score > game.dealer.score))
					this.player.winnigPlays = this.player.winnigPlays + 1;
			}
		}
		let game = new Game();
		Object.freeze(game);
		return game;
	}
	return {
		getInstance: function () {
			if (!instantiated) {
				instantiated = init();
			}
			return instantiated;
		}
	};
})();

let game = Game.getInstance();
