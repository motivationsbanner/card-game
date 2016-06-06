"use strict";

var RangeMinion = require(__dirname + '/../RangedMinion.js');

var bogenschütze = class Bogenschütze extends RangeMinion {
	constructor (cardType, id)
	{
		super(cardType, "Bogenschütze");
		this.id = id;
	}
	
	static get name() {
		return "Bogenschütze";
	}
}

module.exports = bogenschütze;