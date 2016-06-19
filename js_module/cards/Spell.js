"use strict";

var Card = require(__dirname + '/Card.js');

class Spell extends Card {
	constructor ()
	{
		super();
		this.type = "Spell";
	}
	
	isPlayable(conditions)
	{
		return true;
	}
	
	getPlayableFields(field)
	{
		return [ {pos: {row: 'PlayerRange', index: 3}, color: "white"} ];
		
	}
	
}


module.exports = Spell;