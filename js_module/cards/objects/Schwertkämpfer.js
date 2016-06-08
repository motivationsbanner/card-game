"use strict";

var text = "Mit seinem langen Schwert tötet der Schwertkämpfer fast jeden.";
var health =2;
var attack =2;

var MeleeMinion = require(__dirname + '/../MeleeMinion.js');

var schwertkämpfer = class Schwertkämpfer extends MeleeMinion {
	constructor ()
	{
		super();
	}
	
	static get name() {
		return "Schwertkämpfer";
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

module.exports = schwertkämpfer;