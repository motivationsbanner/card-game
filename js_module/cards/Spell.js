"use strict";

var Card = require(__dirname + '/Card.js');

var spell = class Spell extends Card {
	constructor ()
	{
		super();
	}
	get text() { return this.text; }
	
	set text( text ) { this.text = text; }	
}

module.exports = spell;