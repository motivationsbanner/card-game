"use strict";

var Card = require(__dirname + '/Card.js');


class Minion extends Card {
	constructor ()
	{
		super();
	}
	
	getHealth() { return this.health; }
	
	getAttack() { return this.attack; }
	
	setHealth(health) {
		this.health = health;
	}
	
	setAttack(attack) {
		this.attack = attack;
	}
	
} 

module.exports = Minion;