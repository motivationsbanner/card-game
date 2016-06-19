"use strict";

var text = "Der Schildwand erhöht die Verteidigung von jedem Minion in der Nahkampf Reihe um 1 Leben";
var health = 0;
var attack = 0;

var spell = require(__dirname + '/../Spell.js');

class Schildwand extends spell {
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
			return c.minAmountPlayerMeleeMinions(2);
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

Schildwand.nom = "Schildwand"
Schildwand.text = text;
Schildwand.health = health;
Schildwand.attack = attack;


module.exports = Schildwand;