"use strict";

var text = "Der Soldat benötigt nur seinen Speer und sein Schild, um seine Feinde gnadenlos zu töten.";
var health = 3;
var attack = 2;

var MeleeMinion = require(__dirname + '/../MeleeMinion.js');

class Soldat extends MeleeMinion {
	constructor ()
	{
		super();
	}
}

Soldat.nom = "Soldat"
Soldat.text = text;
Soldat.health = health;
Soldat.attack = attack;


module.exports = Soldat;