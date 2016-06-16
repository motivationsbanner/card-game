"use strict";

var text = "Lach den Hofnarr nicht aus sonst bewirft er dich mit seinen Bällen.";
var health = 3;
var attack = 2;

var RangeMinion = require(__dirname + '/../RangedMinion.js');

class Hofnarr extends RangeMinion {
	constructor ()
	{
		super();
		this.attack = attack;
		this.health = health;
	}
}

Hofnarr.nom = "Hofnarr"
Hofnarr.text = text;
Hofnarr.health = health;
Hofnarr.attack = attack;


module.exports = Hofnarr;