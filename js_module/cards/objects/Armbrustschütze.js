"use strict";

var text = "Der Armbrustschütze verfügt über eine sehr starke Armbrust.";
var health = 1;
var attack = 3;

var RangeMinion = require(__dirname + '/../RangedMinion.js');

var armbrustschütze = class Armbrustschütze extends RangeMinion {
	constructor ()
	{
		super();
	}
	
	static get name() {
		return "Armbrustschütze";
	}
	
	static get text() {
		return text;
	}
	
	static get attack() {
		return attack;
	}
	
	static get health() {
		return health;
	}
}

module.exports = armbrustschütze;