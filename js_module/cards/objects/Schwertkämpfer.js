"use strict";

var text = "Mit seinem langen Schwert tötet der Schwertkämpfer fast jeden.";
var health = 2;
var attack = 2;

var MeleeMinion = require(__dirname + '/../MeleeMinion.js');

class Schwertkämpfer extends MeleeMinion {
	constructor ()
	{
		super();
		this.attack = attack;
		this.health = health;
	}
}

Schwertkämpfer.nom = "Schwertkämpfer"
Schwertkämpfer.text = text;
Schwertkämpfer.health = health;
Schwertkämpfer.attack = attack;


module.exports = Schwertkämpfer;