"use strict";
var text = "Der Motivationsbanner erhöht die Motivation einer Reihe um +1 Angriff. Maximal 4 Minions auf der eigenen Spielfeldseite.";
var health = 0;
var attack = 0;

var spell = require(__dirname + '/../Spell.js');

class Motivationsbanner extends spell {
	constructor ()
	{
		super();
	}
	
	isPlayable(c)
	{
		if (super.isPlayable(c))
		{
			// YOUR CONDITIONS
			return c.maxAmountPlayerMinions(4);
		}
		return false;
	}
	
	getPlayableFields(field)
	{
		var playable = [];
		playable.push( {pos: {row: 'Row', index: 2}, color: "white"} );
		playable.push( {pos: {row: 'Row', index: 3}, color: "white"} );
		return playable;
	}
	
	activate (targetRow, manipulator)
	{
		manipulator.buffAttack(targetRow, 1);
	}
}
Motivationsbanner.nom = "Motivationsbanner";
Motivationsbanner.text = text;
Motivationsbanner.health = health;
Motivationsbanner.attack = attack;


module.exports = Motivationsbanner;