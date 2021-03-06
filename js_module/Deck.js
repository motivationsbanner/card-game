"use strict";
var fs = require('fs');
	
var deck = class Deck {
	constructor ()
	{
		this.deck = new Array();
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
	
	createDeck(deck) {
		if (deck != false)
		{
			var arr = deck;
		} else {
			var arr = JSON.parse(fs.readFileSync(__dirname + '/deck/Deck.json', 'utf8'));
		}
		
		for (var obj in arr)
		{
			var name = arr[obj].card_name;
			var amount = arr[obj].card_amount;
			for (var i = 0; i < amount; i++) {
				this.deck.push(name);
			}
		}
		this.shuffle();
	}

	draw()
	{
		var l = this.deck.length - 1;
		var card = this.deck[l];
		this.deck.splice(l, 1);
		return card;
	}
}

module.exports = deck;