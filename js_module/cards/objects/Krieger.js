"use strict";
var text = "Der Krieger ist ein stolzer Kämpfer, welcher jedoch über keine Ausdauer verfügt.";
var health = 2;
var attack = 2;

var MeleeMinion = require(__dirname + '/../MeleeMinion.js');

class Krieger extends MeleeMinion {
	constructor ()
	{
		super();
	}
}

Krieger.nom = "Krieger"
Krieger.text = text;
Krieger.health = health;
Krieger.attack = attack;

module.exports = Krieger;