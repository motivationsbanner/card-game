"use strict";

var MeleeMinion = require(__dirname + '/../MeleeMinion.js');

var schwertkämpfer = class Schwertkämpfer extends MeleeMinion {
	constructor ()
	{
		super();
	}
	
	static get name() {
		return "Schwertkämpfer";
	}
}

module.exports = schwertkämpfer;