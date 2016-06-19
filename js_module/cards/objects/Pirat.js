"use strict";
var voraussetzung = "Der Pirat ist ein gefürchteter Seefahrer";
var text = "Der Pirat tritt nur auf wenn der Feind mindestens 4 Karten auf der Hand hat.";
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
			return c.minAmountMinions(4);
		}
		return false;
	}
}
Pirat.voraussetzung = voraussetzung;
Pirat.nom = "Pirat";
Pirat.text = text;
Pirat.health = health;
Pirat.attack = attack;


module.exports = Pirat;