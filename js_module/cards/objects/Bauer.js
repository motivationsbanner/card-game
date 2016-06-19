"use strict";
var voraussetzung = "Der Bauer darf keine Forderungen Stellen er kämpft wann man es ihm sagt."
var text = "Eine jämmerliche Person";
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
Bauer.voraussetzung = voraussetzung;
Bauer.nom = "Bauer"
Bauer.text = text;
Bauer.health = health;
Bauer.attack = attack;

module.exports = Bauer;