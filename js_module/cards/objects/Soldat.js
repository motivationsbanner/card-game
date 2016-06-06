"use strict";

var MeleeMinion = require(__dirname + '/../MeleeMinion.js');

var soldat = class Soldat extends MeleeMinion {
	constructor (cardType, id)
	{
		super(cardType, "Soldat");
		this.id = id;
	}
	
	static get name() {
		return "Soldat";
	}
}

module.exports = soldat;