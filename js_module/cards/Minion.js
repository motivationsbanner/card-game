"use strict";

var Card = require(__dirname + '/Card.js');


class Minion extends Card {
	constructor ()
	{
		super();
		this.dmg = false;
	}
	
	getHealth() { return this.health; }
	
	getAttack() { return this.attack; }
	
	setHealth(health) {
		var temp = this.health;
		this.health = health;
		
		if (temp > this.health)
			this.dmg = true;
	}
	
	setAttack(attack) {
		this.attack = attack;
	}
	
	getDmg() { return this.dmg;}
	
} 

module.exports = Minion;