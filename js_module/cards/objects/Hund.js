"use strict";

var text = "Der Hund ist geradzu versessen darauf dir in den Arsch zu beissen.";
var health = 1;
var attack = 3;

var MeleeMinion = require(__dirname + '/../MeleeMinion.js');

class Hund extends MeleeMinion {
	constructor ()
	{
		super();
		this.attack = attack;
		this.health = health;
	}
	
	isPlayable(c)
	{
		if (super.isPlayable(c))
		{
			// YOUR CONDITIONS
			return c.minAmountEnemyMinions(1);
		}
		return false;
	}
}

Hund.nom = "Hund"
Hund.text = text;
Hund.health = health;
Hund.attack = attack;


module.exports = Hund;