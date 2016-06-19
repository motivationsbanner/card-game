"use strict";
var voraussetzung = "Es dürfen keine Minions auf dem Feld sein mit 5 oder mehr Angriff.";
var text = "Ein Huhn ist fett und bereit um geschlachtet zu werden.Es nimmt jede Runde+1 Health zu. Keine Minions mit mehr als 5 Angriff.";
var health = 3;
var attack = 0;

var MeleeMinion = require(__dirname + '/../MeleeMinion.js');

class Huhn extends MeleeMinion {
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
			return c.minionsMaxAttack(5);
		}
		return false;
	}
	
	onTurn(manipulator)
	{
		manipulator.buffHP(this.getPos(), 1);
	}
	
}
Huhn.nom = "Huhn";
Huhn.text = text;
Huhn.health = health;
Huhn.attack = attack;

module.exports = Huhn;