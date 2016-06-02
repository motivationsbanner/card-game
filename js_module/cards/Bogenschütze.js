"use strict";

var RangeMinion = require(__dirname + '/RangedMinion.js');

var bogenschütze = class Bogenschütze extends RangeMinion {
	constructor (cardType)
	{
		super(cardType);
	}
}

module.exports = bogenschütze;