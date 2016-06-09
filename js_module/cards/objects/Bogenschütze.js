"use strict";

var text = "Der feige Bogenschütze versteckt sich nur auf den Bäumen.";
var health = 1;
var attack = 2;

var RangeMinion = require(__dirname + '/../RangedMinion.js');

class Bogenschütze extends RangeMinion {
	constructor ()
	{
		super();
	}
}

Bogenschütze.nom = "Bogenschütze"
Bogenschütze.text = text;
Bogenschütze.health = health;
Bogenschütze.attack = attack;


module.exports = Bogenschütze;