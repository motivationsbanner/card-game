"use strict";

var RangeMinion = require(__dirname + '/../RangedMinion.js');

var armbrustschütze = class Armbrustschütze extends RangeMinion {
	constructor (cardType, id)
	{
		super(cardType, "Armbrustschütze");
		this.id = id;
	}
	
	static get name() {
		return "Armbrustschütze";
	}
}

module.exports = armbrustschütze;