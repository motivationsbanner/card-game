"use strict";

var MeleeMinion = require(__dirname + '/../MeleeMinion.js');

var kavallerist = class Kavallerist extends MeleeMinion {
	constructor (cardType, id)
	{
		super(cardType, "Kavallerist");
		this.id = id;
	}
	
	static get name() {
		return "Kavallerist";
	}
	
}


module.exports = kavallerist;