"use strict";

var RangeMinion = require(__dirname + '/../RangedMinion.js');

var bogenschütze = class Bogenschütze extends RangeMinion {
	constructor ()
	{
		super();
	}
	
	static get name() {
		return "Bogenschütze";
	}
}

module.exports = bogenschütze;