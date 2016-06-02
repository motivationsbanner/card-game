"use strict";

var MeleeMinion = require(__dirname + '/MeleeMinion.js');

var schwertkämpfer = class Schwertkämpfer extends MeleeMinion {
	constructor (cardType, id)
	{
		super(cardType, "Schwertkämpfer");
		this.id = id;
	}
}

module.exports = schwertkämpfer;