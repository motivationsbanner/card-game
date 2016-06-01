/**
 * card game
 * client: https://github.com/cravay/card-game
 * server: https://github.com/ceoy/Nodejs
 */
 
"use strict";

class Field {
	constructor (type)
	{
		var playerMelee = [-1, -1, -1, -1, -1];
		var playerRange = [-1, -1, -1, -1, -1];
		var playerHand = new Array();
		
		this.field = [playerMelee, playerRange, playerHand];
	}
	
	getField()
	{
		return this.field;
	}
	
	setHand(cards)
	{
		for ( var index = 0, index < cards.length - 1; index ++ )
		{
			this.playerHand.push( cards[index] );
		}
	}
}

module.exports = function field()
{
	return new Field();
}