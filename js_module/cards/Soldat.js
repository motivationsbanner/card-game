"use strict";

var MeleeMinion = require(__dirname + '/MeleeMinion.js');

var soldat = class Soldat extends MeleeMinion {
	constructor (cardType)
	{
		super(cardType);
	}
}

module.exports = soldat;