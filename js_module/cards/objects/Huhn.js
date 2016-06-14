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

Soldat.nom = "Huhn"
Soldat.text = text;
Soldat.health = health;
Soldat.attack = attack;

module.exports = Huhn;