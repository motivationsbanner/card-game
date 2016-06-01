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
	
	getCardOnPos(pos)
	{
		var row = pos.row,
			index = pos.index;
			
		if (row == 'PlayerMelee')
			return this.field.melee[index];
		if (row == 'PlayerRange')
			return this.field.range[index];
	}
	getHand()
	{
		return this.field.hand;
	}
	
	getHandCard(index)
	{
		return this.field.hand[index];
	}
	setCardPos(pos, card)
	{
		var row = pos.row,
			index = pos.index;
		
		if (row == 'PlayerMelee')
			this.field.melee[index] = card;
		if (row == 'PlayerRange')
			this.field.range[index] = card;
	}
	getCard(pos)
	{
		var card = -1;
		if (pos.row == 'PlayerMelee') 
		{
			card = this.field.melee[pos.index];
		}
		if (pos.row == 'PlayerRange')
		{
			card = this.field.range[pos.index];
		}
		
		if (card == -1)
		{
			console.log('cheat?');
		}
		return card;
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