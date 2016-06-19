"use strict";
var text = "Frisch aus der Eisenschmiede. +2 Health. Maximal 1 verbündetes Minion.";
var health = 0;
var attack = 0;

var spell = require(__dirname + '/../Spell.js');

class Rüstung extends spell {
	constructor ()
	{
		super();
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
	
	getPlayableFields(field)
	{
		return field.getFieldCards("Player");
	}
	
	activate (target, manipulator)
	{
		manipulator.buffHP(target, 3);
	}
}
Rüstung.nom = "Rüstung";
Rüstung.text = text;
Rüstung.health = health;
Rüstung.attack = attack;


module.exports = Rüstung;
