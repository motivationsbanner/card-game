"use strict";
var text = "Ein Huhn ist fett und bereit um geschlachtet zu werden.";
var health = 2;
var attack = 0;

var MeleeMinion = require(__dirname + '/../MeleeMinion.js');

class Huhn extends MeleeMinion {
	constructor ()
	{
		super();
	}
}

Huhn.nom = "Huhn"
Huhn.text = text;
Huhn.health = health;
Huhn.attack = attack;

module.exports = Huhn;