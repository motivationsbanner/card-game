"use strict";

var Card = require(__dirname + '/Card.js');


var minion = class Minion extends Card {
	constructor (cardType)
	{
		super( cardType );
		this.attack = cardType.data.attack;
		this.health = cardType.data.health;
	}
}

module.exports = minion;