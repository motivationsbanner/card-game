"use strict";
var text = "Der Bauer darf keine Forderungen stellen, er kämpft wann man es ihm sagt.";
var health = 1;
var attack = 1;

var MeleeMinion = require(__dirname + '/../MeleeMinion.js');

class Bauer extends MeleeMinion {
	constructor (cardType, id)
	{
		super();
		this.attack = attack;
		this.health = health;
	}
}
Bauer.nom = "Bauer"
Bauer.text = text;
Bauer.health = health;
Bauer.attack = attack;

module.exports = Bauer;