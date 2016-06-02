"use strict";

var MeleeMinion = require(__dirname + '/MeleeMinion.js');

var kavallerist = class Kavallerist extends MeleeMinion {
	constructor (cardType)
	{
		super(cardType);
	}
}

module.exports = kavallerist;