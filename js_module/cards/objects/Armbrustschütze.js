"use strict";

var text = "Der Armbrustschütze verfügt über eine sehr starke Armbrust.";
var health = 1;
var attack = 3;

var RangeMinion = require(__dirname + '/../RangedMinion.js');

class Armbrustschütze extends RangeMinion {
	constructor ()
	{
		super();
	}
	
	activate(target, game)
	{
		var enemyField = game.getNotOnTurn().field;
		var friendlyField = game.getOnTurn().field;
	}
}

Armbrustschütze.nom = "Armbrustschütze";
Armbrustschütze.text = text;
Armbrustschütze.health = health;
Armbrustschütze.attack = attack;


module.exports = Armbrustschütze;