"use strict";
var text = "Der Dieb taucht nur auch wenn der Gegner mehr Karten auf der Hand hat als du. Er zieht dir am Ende jedes Zuges eine Karte";
var health = 2;
var attack = 0;

var RangeMinion = require(__dirname + '/../RangedMinion.js');

class Dieb extends RangeMinion {
	constructor ()
	{
		super();
		this.attack = attack;
		this.health = health;
	}
	
/*	isPlayable(c)
	{
		if (super.isPlayable(c))
		{
			// YOUR CONDITIONS
			return c.enemyMoreCards();
		}
		return false;
	}
*/	
	onTurn(manipulator)
	{
		manipulator.draw(1);
	}
}

Dieb.nom = "Dieb"
Dieb.text = text;
Dieb.health = health;
Dieb.attack = attack;


module.exports = Dieb;