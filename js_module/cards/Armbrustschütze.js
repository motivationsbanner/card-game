"use strict";

var RangeMinion = require(__dirname + '/RangedMinion.js');

var armbrustschütze = class Armbrustschütze extends RangeMinion {
	constructor (cardType)
	{
		super(cardType);
	}
}

module.exports = armbrustschütze;