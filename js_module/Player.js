/**
 * card game
 * client: https://github.com/cravay/card-game
 * server: https://github.com/ceoy/Nodejs
 */

"use strict";

var field = require('../js_module/Field.js');
var deck = require('../js_module/Deck.js');
var Card = require('../js_module/Card.js');

class Player {
	constructor ()
	{
		this.client;
		this.hp = 30;
		this.field = field();
		this.enemyField = field();
		this.deck = deck();
		this.selected_card = -1;
	}
	
	getSelectedCard()
	{
		return this.selected_card;
	}
	
	setSelectedCard(cardPos)
	{
		this.selected_card = cardPos;
	}
	getClient()
	{
		return this.client;
	}
	
	setClient(client)
	{
		this.client = client;
	}
	
	draw(amount)
	{
		var cards = new Array();
		for (var i = 1; i <= amount; i++)
		{
			cards.push(this.deck.draw());
		}
		this.field.setHand(cards);
		this.sendCommandMessage({command: "draw", cards});
	}
	
	enemyDraw(amount)
	{
		this.sendCommandMessage({command: "draw", amount});
	}
	
	sendSystemMessage(message)
	{
		this.client.emit('system', message);
	}
	
	sendCommandMessage(data)
	{
		this.client.emit('command', data);
	}
	
	// This sexy little beast is for testing :)
	sendTriggerMessage(message)
	{
		this.client.emit('trigger', message);
	}
	
	getPlayOptions()
	{
		if (this.selected_card != -1)
		{
			// A Card in your hand is chosen
			if (this.selected_card.row == 'PlayerHand')
			{
				var card = Card( this.field.getHandCard(this.selected_card.index) );
				return card.isPlayable(this.field);
			}
			
			// A Card on the field is chosen
			if (this.selected_card.row != 'PlayerHand')
			{
				var card = this.getCard(this.selected_card);
				card.isPlayable(this.field);
			}
			
		} else {
			// Get Things if no card is chosen
			var playable = new Array();
			var hand = this.field.getHand();
			var fieldWithCard = this.field.getFieldsWithCards(true);
			
			for ( var i = 0; i < hand.length; i++)
			{
				playable.push( {row: 'PlayerHand', index: i} );
			}
			
			for ( var i2 = 0; i2 < fieldWithCard; i2++)
			{
				playable.push( fieldWithCard[i2] );
			}
			return playable;
		}
	}
	
	currentCardActivate(pos)
	{
		if (this.selected_card.row == 'PlayerHand')
			{
				var card = Card( this.field.getHandCard(this.selected_card.index) );
				return card.play(pos, this.field);
			}
	}
}

module.exports = function player() 
{
	return new Player();
}