"use strict";
var text = "Der Pirat ist ein gefürchteter Seefahrer. Der Pirat tritt nur auf wenn der Feind mindestens 4 Karten auf der Hand hat.";
var health = 5;
var attack = 2;

var RangeMinion = require(__dirname + '/../RangedMinion.js');

class Pirat extends RangeMinion {
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
			return c.enemyHandMinAmount(4);
		}
		return false;
	}
}
Pirat.nom = "Pirat";
Pirat.text = text;
Pirat.health = health;
Pirat.attack = attack;


module.exports = Pirat;