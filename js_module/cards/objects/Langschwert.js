"use strict";
var voraussetzung = "Es darf nur ein verbündetes Minion auf dem Spielfeld sein";
var text = "Das Langschwert gibt einem Minion 3 angriff";
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
	
	getPlayableFields(field)
	{
		return field.getFieldCards("Player");
	}
	
	activate (target, manipulator)
	{
		manipulator.buffAttack(target, 3);
	}
	
}
Langschwert.voraussetzung = voraussetzung;
Langschwert.nom = "Langschwert"
Langschwert.text = text;
Langschwert.health = health;
Langschwert.attack = attack;


module.exports = Langschwert;