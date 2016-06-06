"use strict";

var MeleeMinion = require(__dirname + '/../MeleeMinion.js');

var soldat = class Soldat extends MeleeMinion {
	constructor ()
	{
		super();
	}
	
	static get name() {
		return "Soldat";
	}
}

module.exports = soldat;