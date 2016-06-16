"use strict";
var text = "Der Kavallerist ist eine sehr starke Person.";
var health = 5;
var attack = 5;

var MeleeMinion = require(__dirname + '/../MeleeMinion.js');

class Kavallerist extends MeleeMinion {
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
			return c.heroMaxHealth(10);
		}
		return false;
	}
}

Kavallerist.nom = "Kavallerist"
Kavallerist.text = text;
Kavallerist.health = health;
Kavallerist.attack = attack;

module.exports = Kavallerist;