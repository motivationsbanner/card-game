"use strict";
var voraussetzung = "Es muss mindestens 1 anderes befreundetes Minion auf dem Spielfeld sein.";
var text = "Der Soldat benötigt nur seinen Speer und sein Schild, um seine Feinde gnadenlos zu töten.";
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
Soldat.voraussetzung = voraussetzung;
Soldat.nom = "Soldat";
Soldat.text = text;
Soldat.health = health;
Soldat.attack = attack;


module.exports = Soldat;