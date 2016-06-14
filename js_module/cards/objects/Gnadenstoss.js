"use strict";

var text = "Vernichtet ein Verletztes Minion.";
var health = 0;
var attack = 0;

var spell = require(__dirname + '/../Spell.js');

class Gnadenstoss extends spell {
	constructor ()
	{
		super();
	}
}

Gnadenstoss.nom = "Gnadenstoss"
Gnadenstoss.text = text;
Gnadenstoss.health = health;
Gnadenstoss.attack = attack;


module.exports = Gnadenstoss;