"use strict";

var Card = require(__dirname + '/Card.js');

var spell = class Spell extends Card {
	constructor (cardType, id)
	{
		super( cardType, "Spell");
	}
}

module.exports = spell;