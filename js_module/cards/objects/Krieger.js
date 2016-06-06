"use strict";

var MeleeMinion = require(__dirname + '/../MeleeMinion.js');

var krieger = class Krieger extends MeleeMinion {
	constructor ()
	{
		super();
	}
	
	static get name() {
		return "Krieger";
	}
}

module.exports = krieger;