/**
 * card game
 * client: https://github.com/cravay/card-game
 * server: https://github.com/ceoy/Nodejs
 */
 
"use strict";
var Card = require('../js_module/Card.js');

class Deck {
	constructor ()
	{
		this.deck = new Array();
		this.deck = [0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,0,0];
		this.shuffle();
	}
	
	// http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
	shuffle()
	{
		var j, x, i, a;
		a = this.deck;
		for (i = a.length; i; i -= 1) {
			j = Math.floor(Math.random() * i);
			x = this.deck[i - 1];
			this.deck[i - 1] = this.deck[j];
			this.deck[j] = x;
		}
	}
	
	draw()
	{
		var l = this.deck.length - 1;
		var id = this.deck[l];
		var card = Card(id);
		this.deck.splice(l, 1);
		return id;
	}
}

module.exports = function deck()
{ 
	return new Deck(); 
}