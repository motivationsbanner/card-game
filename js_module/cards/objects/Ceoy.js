"use strict";
var text = "Ceoy broken af.";
var health = 1;
var attack = 0;

var MeleeMinion = require(__dirname + '/../MeleeMinion.js');

class Ceoy extends MeleeMinion {
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
			return c.minAmountPlayerMinions(1);
		}
		return false;
	}
	
	onTurnEnd(manipulator)
	{
		manipulator.buffHPFriendly(1, this.pos);
	}
	
	onDeath(manipulator)
	{
		manipulator.buffAttackFriendly(1, this.pos);
	}
}
Ceoy.nom = "Ceoy";
Ceoy.text = text;
Ceoy.health = health;
Ceoy.attack = attack;


module.exports = Ceoy;