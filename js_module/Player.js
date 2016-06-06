/**
 * card game
 * client: https://github.com/cravay/card-game
 * server: https://github.com/ceoy/Nodejs
 */

"use strict";

var Field = require('../js_module/Field.js');
var Deck = require('../js_module/Deck.js');
var Card = require('../js_module/cards/cards.js');

var player = class Player {
	constructor ()
	{
		this.client;
		this.hp = 30;
		this.field = new Field();
		this.deck = new Deck();
		this.selected_card = -1;
	}
	
	draw(amount)
	{
		var cards = new Array();
		for (var i = 1; i <= amount; i++)
		{
			cards.push(this.deck.draw());
		}
		this.field.addHand(cards);
		this.sendCommandMessage( {command: "draw", cards} );
	}
	
	getPlayOptions()
	{
		if (this.selected_card != -1)
		{
			// A Card in your hand is chosen
			if (this.selected_card.row == 'PlayerHand')
			{
				var card = Card( this.field.getHandCard(this.selected_card.index) );  // CHANGE_NAME
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
	
	currentCardActivate(pos, game)
	{
		if (this.selected_card.row == 'PlayerHand')
		{
			this.playCard(pos, game);
		}
	}

	playCard(pos, game)
	{
		// create new card (card in your hand)
		var card_id = this.field.getHandCard(this.selected_card.index) //Change
		var card = Card( card_id );
		
		// Play Card on your field
		this.field = card.play(pos, this.field);
		
	
		var senderPos = this.getSelectedCard(),
			toPos = pos,
			card_name = this.field.getCardOnPos(toPos).getName();
		
		// Send play_card command to player
		var command1 = {command: 'play_card', sender: senderPos, to: toPos, card_name: card_name};
		game.getOnTurn().sendCommandMessage(command1);
		
		var enemySenderPos = this.field.translate(senderPos, this.field.getRow(senderPos.row).length),
			enemyToPos = this.field.translate(pos, this.field.getRow(pos.row).length);
		
		// Play Card on enemy field
		game.getNotOnTurn().setCard( {pos: enemyToPos, cardid: card.getId()} );
		
		// Send play_card command to enemy player
		var commandEnemy = {command: 'play_card', sender: enemySenderPos, to: enemyToPos, card_name: card_name};
		game.getNotOnTurn().sendCommandMessage(commandEnemy);
		
		// Remove card in player hand
		game.getOnTurn().removeHandCard(senderPos);
	}
	
	// used if the enemy plays a card
	setCard(info)
	{
		var card = Card ( info.cardid);
		card.play(info.pos, this.field);
	}
	
	removeHandCard(pos) {
		this.field = this.field.removeCard(pos);
	}
	
	getSelectedCard()
	{
		return this.selected_card;
	}
	
	setSelectedCard(cardPos) { 
		this.selected_card = cardPos;
	}
	
	getClient() {
		return this.client;
	}
	
	setClient(client) {
		this.client = client;
	}
	
	enemyDraw(amount) {
		this.sendCommandMessage( {command: "draw", amount} );
	}
	
	sendSystemMessage(message) {
		this.client.emit('system', message);
	}
	
	sendCommandMessage(data) {
		this.client.emit('command', data);
	}
	
}

module.exports = player;