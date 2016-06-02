"use strict";

var MeleeMinion = require(__dirname + '/MeleeMinion.js');

var soldat = class Soldat extends MeleeMinion {
	constructor (cardType, id)
	{
		super(cardType, "Soldat");
		this.id = id;
	}
}

module.exports = soldat;