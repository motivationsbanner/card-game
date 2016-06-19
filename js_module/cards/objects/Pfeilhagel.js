"use strict";
var voraussetzung =  " Es müssen mindestens 2 verbündete Fernkämpfer auf dem Feld sein.";
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
		var playable = [];
		playable.push( {pos: {row: 'Row', index: 0}, color: "white"} );
		playable.push( {pos: {row: 'Row', index: 1}, color: "white"} );
		return playable;
	}
	
	activate (targetRow, manipulator)
	{
		
		manipulator.dmgRow(targetRow, manipulator.field.getFriendlyRange());
	}
}
Pfeilhagel.voraussetzung = voraussetzung;
Pfeilhagel.nom = "Pfeilhagel";
Pfeilhagel.text = text;
Pfeilhagel.health = health;
Pfeilhagel.attack = attack;


module.exports = Pfeilhagel;