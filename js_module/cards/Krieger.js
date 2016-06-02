"use strict";

var MeleeMinion = require(__dirname + '/MeleeMinion.js');

var krieger = class Krieger extends MeleeMinion {
	constructor (cardType)
	{
		super(cardType);
	}
}

module.exports = krieger;