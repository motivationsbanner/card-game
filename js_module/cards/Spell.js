"use strict";

var Card = require(__dirname + '/Card.js');

var spell = class Spell extends Card {
	constructor (cardType)
	{
		super( cardType );
	}
}

module.exports = spell;