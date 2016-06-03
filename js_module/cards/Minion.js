"use strict";

var Card = require(__dirname + '/Card.js');


var minion = class Minion extends Card {
	constructor (cardType, id)
	{
		super( cardType, id);
		this.attack = 1;
		this.health = 1;
	}
}

module.exports = minion;