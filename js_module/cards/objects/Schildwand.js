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
}

Schildwand.nom = "Schildwand"
Schildwand.text = text;
Schildwand.health = health;
Schildwand.attack = attack;


module.exports = Schildwand;