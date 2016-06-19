"use strict";
var text = "Das Langschwert gibt einem Minion 3 angriff. Maximal 1 verbündetes Minion auf dem Spielfeld.";
var health = 0;
var attack = 0;

var spell = require(__dirname + '/../Spell.js');

class Langschwert extends spell {
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
			return c.maxAmountPlayerMinions(1);
		}
		return false;
	}
	
	
	// Anpassen -> card pos
	getPlayableFields(field)
	{
		return field.getFieldCards("Player");
	}
	
	activate (target, manipulator)
	{
		manipulator.buffAttack(target, 3);
	}
	
}
Langschwert.nom = "Langschwert"
Langschwert.text = text;
Langschwert.health = health;
Langschwert.attack = attack;


module.exports = Langschwert;