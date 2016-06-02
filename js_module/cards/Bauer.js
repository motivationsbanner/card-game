"use strict";

var MeleeMinion = require(__dirname + '/MeleeMinion.js');

var bauer = class Bauer extends MeleeMinion {
	constructor (cardType, id)
	{
		super(cardType, "Bauer");
		this.id = id;
	}
}

module.exports = bauer;