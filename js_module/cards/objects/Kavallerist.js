"use strict";

var MeleeMinion = require(__dirname + '/../MeleeMinion.js');

var kavallerist = class Kavallerist extends MeleeMinion {
	constructor ()
	{
		super();
	}
	
	static get name() {
		return "Kavallerist";
	}
	
}


module.exports = kavallerist;