"use strict";

var Card = require(__dirname + '/Card.js');


class Minion extends Card {
	constructor ()
	{
		super();
	}
	
	getHealth() { return this.health; }
	
	getAttack() { return this.attack; }
	
} 

module.exports = Minion;