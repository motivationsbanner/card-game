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
}
Pfeilhagel.voraussetzung = voraussetzung;
Pfeilhagel.nom = "Pfeilhagel";
Pfeilhagel.text = text;
Pfeilhagel.health = health;
Pfeilhagel.attack = attack;


module.exports = Pfeilhagel;