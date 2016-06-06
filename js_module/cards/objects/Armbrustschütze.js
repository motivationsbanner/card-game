"use strict";

var RangeMinion = require(__dirname + '/../RangedMinion.js');

var armbrustschütze = class Armbrustschütze extends RangeMinion {
	constructor ()
	{
		super();
	}
	
	static get name() {
		return "Armbrustschütze";
	}
}

module.exports = armbrustschütze;