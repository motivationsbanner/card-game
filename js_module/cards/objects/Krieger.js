"use strict";
var voraussetzung = "Es muss mindestens ein Feindliches Nahkampf Minion auf dem Spielfeld sein.";
var text = "Der Krieger ist ein stolzer Kämpfer, welcher jedoch über keine Ausdauer verfügt.";
var health = 2;
var attack = 2;

var MeleeMinion = require(__dirname + '/../MeleeMinion.js');

class Krieger extends MeleeMinion {
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
			return c.minAmountEnemyMeleeMinions(1);
		}
		return false;
	}
}
Krieger.voraussetzung = voraussetzung;
Krieger.nom = "Krieger";
Krieger.text = text;
Krieger.health = health;
Krieger.attack = attack;

module.exports = Krieger;