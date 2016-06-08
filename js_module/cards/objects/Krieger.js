"use strict";
var text = "Der Krieger ist ein stolzer Kämpfer, welcher jedoch über keine Ausdauer verfügt.";
var health = 2;
var attack = 2;

var MeleeMinion = require(__dirname + '/../MeleeMinion.js');

var krieger = class Krieger extends MeleeMinion {
	constructor ()
	{
		super();
	}
	
	static get name() {
		return "Krieger";
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

module.exports = krieger;