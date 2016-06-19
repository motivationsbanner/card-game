"use strict";
var text = "Der Soldat benötigt nur seinen Speer und sein Schild, um seine Feinde gnadenlos zu töten. Mindestens 1 befreundetes Minion auf dem Spielfeld.";
var health = 3;
var attack = 2;

var MeleeMinion = require(__dirname + '/../MeleeMinion.js');

class Soldat extends MeleeMinion {
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
}
Soldat.nom = "Soldat";
Soldat.text = text;
Soldat.health = health;
Soldat.attack = attack;


module.exports = Soldat;