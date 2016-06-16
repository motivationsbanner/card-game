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
	
	getPos() { return this.pos; }
	
	setPos(pos) { this.pos = pos; }
	
	getType() { return this.type; }
	
	setActionDone(bool) {
		this.action_done = bool;	
	}
} 

module.exports = Minion;