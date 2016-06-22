"use strict";

var field = class Field {
	constructor ()
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
	
	addHand(cardsToAdd)
	{
		for ( var index = 0; index < cardsToAdd.length; index ++ )
		{
			this.field.hand.push( cardsToAdd[index] );
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
			
		if (pos.row === 'Players')
		{
			newPos.row = 'Players';
			if (pos.index == 0)
				newPos.index = 1;
			if (pos.index == 1)
				newPos.index = 0;
		}
		
		if (pos.row === "Row")
			newPos.row = "Row";
		
		return newPos;
	}
	
	getCardOnPos(pos)
	{
		var row = pos.row,
			i = pos.index;
			
		if (row == 'PlayerMelee')
			return this.field.melee[i];
		if (row == 'PlayerRange')
			return this.field.range[i];
		if (row == 'EnemyMelee')
			return this.field.enemyMelee[i];
		if (row == 'EnemyRange')
			return this.field.enemyRange[i];
		
		if (row == 'Players') {
			return {row: "Players", index: i, type: "Player"};
		}
	}

	
	setCardPos(pos, card)
	{
		var row = pos.row,
			index = pos.index;
		
		if (row == 'PlayerMelee')
			this.field.melee[index] = card;
		if (row == 'PlayerRange')
			this.field.range[index] = card;
		
		if (row == 'EnemyMelee')
			this.field.enemyMelee[index] = card;
		if (row == 'EnemyRange')
			this.field.enemyRange[index] = card;
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
	
	getFieldsWithCards(friendly)
	{
		var fields = [];
		
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
	
	getFieldCards(smt)
	{
		var fields = [];
		
		if (smt == "Player")
		{
			for ( var i = 0; i < this.field.melee.length; i++)
			{
				if (this.field.melee[i] != -1)
					fields.push(this.field.melee[i]);
			}
			
			for ( var i2 = 0; i2 < this.field.range.length; i2++)
			{
				if (this.field.range[i2] != -1)
					fields.push( this.field.range[i2] );
			}
			
			return fields;
		}
		
		if (smt == "Enemy")
		{
			
			for ( var i = 0; i < this.field.enemyMelee.length; i++)
			{
				if (this.field.enemyMelee[i] != -1)
					fields.push( this.field.enemyMelee[i] );
			}
			
			for ( var i2 = 0; i2 < this.field.enemyRange.length; i2++)
			{
				if (this.field.enemyRange[i2] != -1)
					fields.push( his.field.enemyRange[i2] );
			}
			
			return fields;
		}
		
		if (smt == "All")
		{
			for ( var i = 0; i < this.field.melee.length; i++)
			{
				if (this.field.melee[i] != -1)
					fields.push( this.field.melee[i] );
			}
			
			for ( var i2 = 0; i2 < this.field.range.length; i2++)
			{
				if (this.field.range[i2] != -1)
					fields.push( this.field.range[i2] );
			}
			
			for ( var a = 0; a < this.field.enemyMelee.length; a++)
			{
				if (this.field.enemyMelee[a] != -1)
					fields.push(this.field.enemyMelee[a]);
			}
			
			for ( var a2 = 0; a2 < this.field.enemyRange.length; a2++)
			{
				if (this.field.enemyRange[a2] != -1)
					fields.push( this.field.enemyRange[a2] );
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
	
	getCardAmountInRow(row)
	{
		var r = null;
		var x = 0;
		if (row == 'PlayerHand')
			r = this.field.hand;
		if (row == 'PlayerMelee')
			r = this.field.melee;
		if (row == 'PlayerRange')
			r = this.field.range;
		if (row == 'EnemyMelee')
			r = this.field.enemyMelee;
		if (row == 'EnemyRange')
			r = this.field.enemyRange;
		if (row == 'EnemyHand')
			r = this.field.enemyHand;
		
		for (var i = 0; i < r.length; i++)
		{
			if (r[i] != -1)
				x++;
		}
		
		return x;
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
		
	getCardsInRow(row)
	{
		var cards = [], temp_cards = [];
		switch (row)
		{
			case 0:
				temp_cards = this.getRow('EnemyRange');
				break;
			case 1:
				temp_cards = this.getRow('EnemyMelee');
				break;
			case 2:
				temp_cards = this.getRow('PlayerMelee');
				break;
			case 3: 
				temp_cards = this.getRow('PlayerRange');
				break;
		}
		
		for (var i = 0; i < temp_cards.length; i++)
		{
			if (temp_cards[i] != -1)
				cards.push(temp_cards[i]);
		}
		return cards;
	}
	
	getPosDmgCards()
	{
		var cards = this.getFieldCards("All");
		var dmgCards = [];
		for (var i = 0; i < cards.length; i++)
		{
			if (cards[i].getDmg() == true)
			{
				var pos = {pos: cards[i].getPos(), color: "white"};
				dmgCards.push(pos);
			}			
		}
		return dmgCards;		
	}
	getHand() {
		return this.field.hand;
	}
	
	getEnemyHand()	{
		return this.field.enemyHand;
	}
	
	getHandCard(index) {
		return this.field.hand[index];
	}
	
	getField() {
		return this.field;
	}
	
	getFriendlyMinions()
	{
		var melee = this.getCardAmountInRow('PlayerMelee');
		var range = this.getCardAmountInRow('PlayerRange');
		return melee + range;
	}
	
	getEnemyMinions()
	{
		var melee = this.getCardAmountInRow('EnemyMelee');
		var range = this.getCardAmountInRow('EnemyRange');
		return melee + range;
	}
	
	getMelee()
	{
		var friend = this.getCardAmountInRow('PlayerMelee');
		var enemy = this.getCardAmountInRow('EnemyMelee');
		return friend + enemy;
	}
	
	getRange()
	{
		var friend = this.getCardAmountInRow('PlayerRange');
		var enemy = this.getCardAmountInRow('EnemyRange');
		return friend + enemy;
	}
	
	getFriendlyMelee() {
		return this.getCardAmountInRow('PlayerMelee');
	}
	
	getEnemyMelee() {
		return this.getCardAmountInRow('EnemyMelee');
	}
	
	getFriendlyRange() {
		return this.getCardAmountInRow('PlayerRange');
	}
	
	getEnemyRange() {
		return this.getCardAmountInRow('EnemyRange');
	}
	
	getSpectatorField(playerInfo)
	{
		// Create object
		var spectatorField = {
			EnemyHand: null,
			EnemyRange: null,
			EnemyMelee: null,
			PlayerMelee: null,
			PlayerRange: null,
			EnemyHero: null,
			EnemyDeck: null,
			PlayerDeck: null,
			PlayerHero: null
		};
		
		// Get EnemyHand Length
		spectatorField.EnemyHand = this.getEnemyHand().length;
		
		// Get all enemy ranges
		var enemyRange = [];
		for (var i = 0; i < this.field.enemyRange.length; i++)
		{
			if (this.field.enemyRange[i] == -1)
			{
				enemyRange.push(null);
			} else {
				var card = this.field.enemyRange[i];
				var obj = {name: card.constructor.name, health: card.getHealth(), attack: card.getAttack()};
				enemyRange.push(obj);
			}
		}
		spectatorField.EnemyRange = enemyRange;
		
		// Get all enemy melees
		var enemyMelee = [];
		for (var i = 0; i < this.field.enemyMelee.length; i++)
		{
			if (this.field.enemyRange[i] == -1)
			{
				enemyMelee.push(null);
			} else {
				var card = this.field.enemyMelee[i];
				var obj = {name: card.constructor.name, health: card.getHealth(), attack: card.getAttack()};
				enemyMelee.push(obj);
			}
		}
		spectatorField.EnemyMelee = enemyMelee;
		
		// Get all player melees
		var playerMelee = [];
		for (var i = 0; i < this.field.melee.length; i++)
		{
			if (this.field.melee[i] == -1)
			{
				playerMelee.push(null);
			} else {
				var card = this.field.melee[i];
				var obj = {name: card.constructor.name, health: card.getHealth(), attack: card.getAttack()};
				playerMelee.push(obj);
			}
		}
		spectatorField.PlayerMelee = playerMelee;
		
		// Get all player range
		var playerRange = [];
		for (var i = 0; i < this.field.range.length; i++)
		{
			if (this.field.range[i] == -1)
			{
				playerRange.push(null);
			} else {
				var card = this.field.range[i];
				var obj = {name: card.constructor.name, health: card.getHealth(), attack: card.getAttack()};
				playerRange.push(obj);
			}
		}
		spectatorField.PlayerRange = playerRange;
		
		var playerHand = [];
		for (var i = 0; i < this.field.hand.length; i++)
		{
				var card_name = this.field.hand[i];
				playerHand.push( {name: card_name} );
		}
		
		spectatorField.PlayerHand = playerHand;		
		
		var enemyHero = {};
		enemyHero.name = playerInfo.name;
		enemyHero.health = playerInfo.health;
		
		spectatorField.EnemyHero = enemyHero;
		
		var playerHero = {};
		playerHero.name = playerInfo.playerName;
		playerHero.health = playerInfo.playerHealth;
		
		spectatorField.PlayerHero = playerHero;
		
		spectatorField.EnemyDeck = playerInfo.deckSize;
		spectatorField.PlayerDeck = playerInfo.playerDeckSize;
		
		return spectatorField;
	}

}

module.exports = field;