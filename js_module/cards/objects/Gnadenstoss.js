"use strict";
var text = "Vernichtet ein Verletztes Minion. Mindestens 1 Verbündetes Minion auf dem Feld.";
var health = 0;
var attack = 0;

var spell = require(__dirname + '/../Spell.js');

class Gnadenstoss extends spell {
	constructor ()
	{
		super();
	}
	
	isPlayable(c)
	{
		if (super.isPlayable(c))
		{
			// YOUR CONDITIONS
			return c.minAmountPlayerMinions(1);

		}
		return false;
	}
	
	getPlayableFields(field)
	{
		var playable = field.getPosDmgCards();
		return playable;
	}
	
	activate (target, manipulator)
	{
		manipulator.kill(manipulator.field.getCardOnPos(target));
	}
	
}
Gnadenstoss.nom = "Gnadenstoss"
Gnadenstoss.text = text;
Gnadenstoss.health = health;
Gnadenstoss.attack = attack;


module.exports = Gnadenstoss;