"use strict";
var text = "Der Armbrustschütze verfügt über eine sehr starke Armbrust. Mindestens 2 verbündete Minions in der Nahkampfreihe.";
var health = 1;
var attack = 3;

var RangeMinion = require(__dirname + '/../RangedMinion.js');

class Armbrustschütze extends RangeMinion {
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
			return c.minAmountPlayerMeleeMinions(2);
		}
		return false;
	}
}
Armbrustschütze.nom = "Armbrustschütze";
Armbrustschütze.text = text;
Armbrustschütze.health = health;
Armbrustschütze.attack = attack;


module.exports = Armbrustschütze;