"use strict";

var Card = require(__dirname + '/Card.js');


var minion = class Minion extends Card {
	constructor ()
	{
		super();
	}
	
	getAttack() {
		return this.attack;
	}
	
	getHealth() {
		return this.health;
	}
	
	setAttack( attack ) {
		this.attack = attack;
	}
	
	setHealth( health ) {
		this.health = health;
	}
	
	getText() {
		return this.text;
	}
	
	setText( text ) {
		this.text = text;
	}
} 

module.exports = minion;