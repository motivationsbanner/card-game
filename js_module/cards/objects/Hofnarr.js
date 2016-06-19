"use strict";
var voraussetzung = "Der Hofnarr tritt nicht ohne Publikum auf es müssen mindestens 4 Minions auf dem Spielfeld sein.";
var text = "Lach den Hofnarr nicht aus sonst bewirft er dich mit seinen Bällen.";
var health = 3;
var attack = 2;

var RangeMinion = require(__dirname + '/../RangedMinion.js');

class Hofnarr extends RangeMinion {
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
Hofnarr.voraussetzung = voraussetzung;
Hofnarr.nom = "Hofnarr";
Hofnarr.text = text;
Hofnarr.health = health;
Hofnarr.attack = attack;


module.exports = Hofnarr;