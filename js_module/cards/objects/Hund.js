"use strict";

var text = "Der Hund ist geradzu versessen darauf dir in den Arsch zu beissen.";
var health = 3;
var attack = 1;

var MeleeMinion = require(__dirname + '/../MeleeMinion.js');

class Hund extends MeleeMinion {
	constructor ()
	{
		super();
	}
}

Hund.nom = "Hund"
Hund.text = text;
Hund.health = health;
Hund.attack = attack;


module.exports = Hund;