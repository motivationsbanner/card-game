"use strict";
var voraussetzung = "Es dürfen maximal 4 Karten auf der Hand sein.";
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
Bücherwissen.voraussetzung = voraussetzung;
Bücherwissen.nom = "Bücherwissen";
Bücherwissen.text = text;
Bücherwissen.health = health;
Bücherwissen.attack = attack;


module.exports = Bücherwissen;