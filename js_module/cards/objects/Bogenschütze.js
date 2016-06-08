"use strict";

var text = "Der feige Bogenschütze versteckt sich nur auf den Bäumen.";
var health = 1;
var attack = 2;

var RangeMinion = require(__dirname + '/../RangedMinion.js');

var bogenschütze = class Bogenschütze extends RangeMinion {
	constructor ()
	{
		super();
	}
	
	static get name() {
		return "Bogenschütze";
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

module.exports = bogenschütze;