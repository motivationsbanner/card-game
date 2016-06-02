"use strict";

var RangeMinion = require(__dirname + '/RangedMinion.js');

var armbrustschütze = class Armbrustschütze extends RangeMinion {
	constructor (cardType, id)
	{
		super(cardType, "Armbrustschütze");
		this.id = id;
	}
}

module.exports = armbrustschütze;