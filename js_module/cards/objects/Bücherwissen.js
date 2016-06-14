"use strict";

var text = "Durch das wissen welches in Büchern gespeichert  ist werden zwei neue Karten gezogen.";
var health = 0;
var attack = 0;

var spell = require(__dirname + '/../Spell.js');

class Bücherwissen extends spell {
	constructor ()
	{
		super();
	}
}

Bücherwissen.nom = "Bücherwissen"
Bücherwissen.text = text;
Bücherwissen.health = health;
Bücherwissen.attack = attack;


module.exports = Bücherwissen;