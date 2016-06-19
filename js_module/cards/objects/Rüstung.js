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
	
	// Anpassen -> card pos
	getPlayableFields(field)
	{
		var cards = field.getFieldCards("Player"); 
		var playable = [];
		for (var i = 0; i < cards. length; i++)
		{
			var pos = cards[i].getPos();
			playable.push({pos: pos, color: "white"});
		}
		return playable;
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
