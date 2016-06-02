"use strict";

var MeleeMinion = require(__dirname + '/MeleeMinion.js');

var schwertkämpfer = class Schwertkämpfer extends MeleeMinion {
	constructor (cardType)
	{
		super(cardType);
	}
}

module.exports = schwertkämpfer;