"use strict";

var text = "Eine jämmerliche Person";
var health = 1;
var attack = 1;

var MeleeMinion = require(__dirname + '/../MeleeMinion.js');

var bauer = class Bauer extends MeleeMinion {
	constructor (cardType, id)
	{
		super();
	}
	
	static get name() {
		return "Bauer";
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

module.exports = bauer;