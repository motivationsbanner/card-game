/**
 * card game
 * client: https://github.com/cravay/card-game
 * server: https://github.com/ceoy/Nodejs
 */
 
"use strict";

var field = class Field {
	constructor (type)
	{
		var playerMelee = [-1, -1, -1, -1, -1];
		var playerRange = [-1, -1, -1, -1, -1];
		var playerHand = new Array();
		
		var eMelee = [-1, -1, -1, -1, -1];
		var eRange = [-1, -1, -1, -1, -1];
		var eHand = new Array();
		
		this.field = {
			melee: playerMelee,
			range: playerRange,
			hand: playerHand,
			enemyMelee: eMelee,
			enemyHand: eHand,
			enemyRange: eRange
		};
	}
	
	addHand(cards)
	{
		for ( var index = 0; index < cards.length; index ++ )
		{
			this.field.hand.push( cards[index] );
		}
	}
			
	translate(pos, maxIndex)
	{
		var newPos = {row: "NULL", index: -1};
		if (pos.row === 'PlayerHand')
			newPos.row = 'EnemyHand';
		if (pos.row === 'PlayerMelee')
			newPos.row = 'EnemyMelee';
		if (pos.row === 'PlayerRange')
			newPos.row = 'EnemyRange';
			
		if (pos.row === 'EnemyHand')
			newPos.row = 'PlayerHand';
		if (pos.row === 'EnemyMelee')
			newPos.row = 'PlayerMelee';
		if (pos.row === 'EnemyRange')
			newPos.row = 'PlayerRange';
			
		newPos.index = maxIndex - pos.index;

		return newPos;
	}
	
	getCardOnPos(pos)
	{
		var row = pos.row,
			index = pos.index;
			
		if (row == 'PlayerMelee')
			return this.field.melee[index];
		if (row == 'PlayerRange')
			return this.field.range[index];
		if (row == 'EnemyMelee')
			return this.field.enemyMelee[index];
		if (row == 'EnemyRange')
			return this.field.enemyRange[index];
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
		var row = pos.row,
			index = pos.index;
		if (row == 'PlayerMelee') 
		{
			card = this.field.melee[index];
		}
		if (row == 'PlayerRange')
		{
			card = this.field.range[index];
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
					fields.push( {row: 'PlayerRange', index: i2} );
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
	
	getRow(row)
	{
		if (row == 'PlayerHand')
			return this.field.hand;
		if (row == 'PlayerMelee')
			return this.field.melee;
		if (row == 'PlayerRange')
			return this.field.range;
		if (row == 'EnemyMelee')
			return this.field.enemyMelee;
		if (row == 'EnemyRange')
			return this.field.enemyRange;
		if (row == 'EnemyHand')
			return this.field.enemyHand;
	}
	
	removeCard(pos)
	{
		switch (pos.row)
		{
			case 'PlayerHand':
				this.field.hand.splice(pos.index,1);
				break;
			case 'PlayerMelee':
				this.field.melee[pos.index] = -1;
				break;
			case 'PlayerRange':
				this.field.range[pos.index] = -1;
				break;
			case 'EnemyHand':
				this.field.enemyHand.splice(pos.index,1);
				break;
			case 'EnemyMelee':
				this.field.enemyMelee[pos.index] = -1;
				break;
			case 'EnemyRange':
				this.field.enemyRange[pos.index] = -1;
				break;			
		}
		return this;
	}
	
	
	getHand() {
		return this.field.hand;
	}
	
	getHandCard(index) {
		return this.field.hand[index];
	}
	
	getField() {
		return this.field;
	}
	
}

module.exports = field;