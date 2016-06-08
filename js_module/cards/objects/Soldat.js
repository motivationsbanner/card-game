"use strict";

var text = "Der Soldat benötigt nur seinen Speer und sein Schild, um seine Feinde gnadenlos zu töten.";
var health = 3;
var attack = 2;

var MeleeMinion = require(__dirname + '/../MeleeMinion.js');

var soldat = class Soldat extends MeleeMinion {
	constructor ()
	{
		super();
	}
	
	static get name() {
		return "Soldat";
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

module.exports = soldat;