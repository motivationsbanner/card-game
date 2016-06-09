"use strict";

var text = "Der Motivationsbanner erhöht die Motivation einer Reihe um +1 Angriff.";
var health = 0;
var attack = 0;

var spell = require(__dirname + '/../Spell.js');

class Motivationsbanner extends spell {
	constructor ()
	{
		super();
	}
}

Motivationsbanner.nom = "Motivationsbanner"
Motivationsbanner.text = text;
Motivationsbanner.health = health;
Motivationsbanner.attack = attack;


module.exports = Motivationsbanner;