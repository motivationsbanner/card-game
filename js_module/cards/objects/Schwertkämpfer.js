"use strict";

var MeleeMinion = require(__dirname + '/../MeleeMinion.js');

var schwertkämpfer = class Schwertkämpfer extends MeleeMinion {
	constructor (cardType, id)
	{
		super(cardType, "Schwertkämpfer");
		this.id = id;
	}
	
	static get name() {
		return "Schwertkämpfer";
	}
}

module.exports = schwertkämpfer;