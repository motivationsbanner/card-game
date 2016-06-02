"use strict";

var MeleeMinion = require(__dirname + '/MeleeMinion.js');

var bauer = class Bauer extends MeleeMinion {
	constructor (cardType)
	{
		super(cardType);
	}
}

module.exports = bauer;