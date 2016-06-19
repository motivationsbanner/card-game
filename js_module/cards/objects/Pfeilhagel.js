"use strict";

var text = "Fügt jedem Minion in der gewählten Reihe 1 Schaden für jedes verbündete Fernkampf Minion zu";
var health = 0;
var attack = 0;

var spell = require(__dirname + '/../Spell.js');

class Pfeilhagel extends spell {
	constructor ()
	{
		super();
	}
	
	isPlayable(c)
	{
		if (super.isPlayable(c))
		{
			// YOUR CONDITIONS
			return c.minAmountPlayerRangeMinions(2);
		}
		return false;
	}
	
	getPlayableFields(field)
	{
		
		return [ {pos: {row: 'Row', index: 2}, color: "white"} ];
	}
	
	activate (targetRow, manipulator)
	{
		
		manipulator.buffHP(targetRow, 2);
	}
}

Pfeilhagel.nom = "Pfeilhagel"
Pfeilhagel.text = text;
Pfeilhagel.health = health;
Pfeilhagel.attack = attack;


module.exports = Pfeilhagel;