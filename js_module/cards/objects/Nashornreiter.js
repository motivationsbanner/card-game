"use strict";
var text = "Nashornreiter piksen gerne herum. Mindestens 1 verbündetes Minion in dieser Runde gestorben.";
var health = 2;
var attack = 5;

var MeleeMinion = require(__dirname + '/../MeleeMinion.js');

class Nashornreiter extends MeleeMinion {
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
			return true;
		}
		return false;
	}
}
Nashornreiter.nom = "Nashornreiter"
Nashornreiter.text = text;
Nashornreiter.health = health;
Nashornreiter.attack = attack;


module.exports = Nashornreiter;