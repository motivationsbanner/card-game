"use strict";
var text = "Durch das Wissen welches in Büchern gespeichert  ist werden zwei neue Karten gezogen. Maximal 4 Karten auf der Hand.";
var health = 0;
var attack = 0;

var spell = require(__dirname + '/../Spell.js');

class Bücherwissen extends spell {
	constructor ()
	{
		super();
	}
	
	isPlayable(c)
	{
		if (super.isPlayable(c))
		{
			// YOUR CONDITIONS
			return c.playerHandMaxAmount(4);
		}
		return false;
	}
	
	getPlayableFields(field)
	{
		return [ {pos: {row: 'Players', index: 1}, color: "white"} ];
	}
	
	activate (target, manipulator)
	{
		manipulator.draw(2);
	}
}
Bücherwissen.nom = "Bücherwissen";
Bücherwissen.text = text;
Bücherwissen.health = health;
Bücherwissen.attack = attack;


module.exports = Bücherwissen;