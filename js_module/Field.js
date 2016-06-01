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
		
		this.field = {melee: playerMelee, range: playerRange, hand: playerHand};
	}
	
	getField()
	{
		return this.field;
	}
	
	setHand(cards)
	{
		for ( var index = 0; index < cards.length; index ++ )
		{
			this.field.hand.push( cards[index] );
		}
	}
	
	getHand()
	{
		return this.field.hand;
	}
	
	// The Hardcore kek code.....:'(
	getFieldsWithCards(friendly)
	{
		var fields = new Array();
		
		if (friendly)
		{
			for ( var i = 0; i < this.field.melee.length; i++)
			{
				if (this.field.melee[i] != -1)
					fields.push( {row: 'PlayerMelee', index: i} );
			}
			
			for ( var i2 = 0; i2 < this.field.range.length; i2++)
			{
				if (this.field.range[i2] != -1)
					fields.push({row: 'PlayerRange', index: i2} ) ;
			}
			
			return fields;
		}
		
		if (!friendly)
		{
			
			for ( var i = 0; i < this.field.melee.length; i++)
			{
				if (this.field.melee[i] != -1)
					fields.push( {row: 'EnemyMelee', index: i} );
			}
			
			for ( var i2 = 0; i2 < this.field.range.length; i2++)
			{
				if (this.field.range[i2] != -1)
					fields.push( {row: 'EnemyRange', index: i2} );
			}
			
			return fields;
		}
		
	}
}

module.exports = function field()
{
	return new Field();
}