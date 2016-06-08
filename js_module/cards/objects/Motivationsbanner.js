"use strict";

var text = "Der Motivationsbanner erhöht die Motivation einer Reihe um +1 Angriff.";
var health = 0;
var attack = 0;

var spell = require(__dirname + '/../Spell.js');

var motivationsbanner = class Motivationsbanner extends spell {
	constructor ()
	{
		super();
	}
	
	static get name() {
		return "Motivationsbanner";
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

module.exports = motivationsbanner;