"use strict";

var Card = require(__dirname + '/Card.js');


var minion = class Minion extends Card {
	constructor ()
	{
		super();
	}
	
	get attack() { return this.attack; }
	
	get health() { return this.health; }
	
	set attack( attack ) { this.attack = attack; }
	set health( health ) { this.health = health; }
} 

module.exports = minion;