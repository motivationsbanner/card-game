"use strict";

var Field = require('../js_module/Field.js');
var Deck = require('../js_module/Deck.js');
var Card = require('../js_module/cards/cards.js');

var player = class Player {
	constructor ()
	{
		this.client;
		this.hp = 15;
		this.field = new Field();
		this.deck = new Deck();
		this.selected_card = -1;
	}
	
	draw(amount, m)
	{
		var cards = new Array();
		for (var i = 0; i < amount; i++)
		{
			if (this.deck.deck.length == 0)
			{
				m.endGame({index: 1});
			}
			if (this.field.getHand().length == 8)
			{
				var temp_card = this.deck.draw();
				this.sendCommandMessage({command: "overdraw", card: temp_card });
				return false;
			}
			cards.push(this.deck.draw());
		}
		this.field.addHand(cards);
		this.sendCommandMessage( {command: "draw", cards} );
		return true;
	}
	
	getPlayOptions(conditions)
	{
		// Check if there is a selected Card
		if (this.selected_card != -1)
		{
			// A Card in your hand is chosen
			if (this.selected_card.row == 'PlayerHand')
			{
				var card = new cards[ this.field.getHandCard(this.selected_card.index) ];  // CHANGE_NAME
				if (card.isPlayable(conditions))
					return card.getPlayableFields(this.field);
				return;
			}
			
			// A Card on the field is chosen
			if (this.selected_card.row != 'PlayerHand')
			{
				var card = this.field.getCard(this.selected_card);
				return card.getPlayableFields(this.field);
			}
			
		} else {
			// Get Things if no card is chosen
			var playable = new Array();
			var hand = this.field.getHand();
			var fieldWithCard = this.field.getFieldsWithCards(true);
			
			// Check cards on your hand
			for ( var i = 0; i < hand.length; i++)
			{
				var card = new cards[this.field.getHandCard(i)];
				if (card.isPlayable(conditions))
					if (card.getPlayableFields(this.field).length > 0)
						playable.push( { pos: {row: 'PlayerHand', index: i} , color: "white" } );
			}
			
			// Check cards on the field
			for ( var i2 = 0; i2 < fieldWithCard.length; i2++)
			{
				var card = this.field.getCard(fieldWithCard[i2]);
				if (card.getPlayableFields(this.field).length > 0)
					playable.push( { pos: fieldWithCard[i2], color: "white" } );
			}
			
			return playable;
		}
	}
	
	currentCardActivate(pos, game, manipulator)
	{
		if (this.selected_card.row == 'PlayerHand')
		{
			this.playCard(pos, game);
			return;
		}
		
		// Attack or do whatever
		var card = this.field.getCardOnPos(pos);
		this.field.getCardOnPos(this.selected_card).setActionDone(true);
		this.field.getCardOnPos(this.selected_card).activate(card, manipulator);
	}

	playCard(pos, game)
	{
		// create new card (card in your hand)
		var cardname = this.field.getHandCard(this.selected_card.index)
		var card = new cards[cardname];
		
		var senderPos = this.getSelectedCard();
		
		if (card.getType() == 'Spell')
		{
			var enemySenderPos = this.field.translate(senderPos, this.field.getRow(senderPos.row).length -1);
			
			var playerCommand =  {command: "cast_spell", sender: senderPos, card_name: cardname},
				enemyCommand = {command: "cast_spell", sender: enemySenderPos, card_name: cardname};
			
			game.getOnTurn().sendCommandMessage(playerCommand);
			game.getNotOnTurn().sendCommandMessage(enemyCommand);
			
			game.getOnTurn().removeHandCard(senderPos);

			card.activate(pos, game.manipulator);
			return;
		}
		
		// Play Card on your field
		card.play();
		this.field.setCardPos(pos, card);
		card.setPos(pos);
		
		var	toPos = pos,
			card_name = cardname;
		
		// Send play_card command to player
		var command1 = {command: 'play_card', sender: senderPos, to: toPos, card_name: card_name};
		game.getOnTurn().sendCommandMessage(command1);
		
		var enemySenderPos = this.field.translate(senderPos, this.field.getRow(senderPos.row).length -1 ),
			enemyToPos = this.field.translate(pos, this.field.getRow(pos.row).length -1);
		
		// Play Card on enemy field
		game.getNotOnTurn().setCard( {pos: enemyToPos, cardid: card_name} );
		
		// Send play_card command to enemy player
		var commandEnemy = {command: 'play_card', sender: enemySenderPos, to: enemyToPos, card_name: card_name};
		game.getNotOnTurn().sendCommandMessage(commandEnemy);
		
		// Remove card in player hand
		game.getOnTurn().removeHandCard(senderPos);
		
		
	}
	
	endTurn()
	{
		var all_cards = this.field.getFieldsWithCards(true);
		for (var i = 0; i < all_cards.length; i++)
		{
			this.field.getCard(all_cards[i]).endTurn();
		}
		this.selected_card = -1;
	}
	
	onTurn(manipulator)
	{
		var all_cards = this.field.getFieldsWithCards(true);
		for (var i = 0; i < all_cards.length; i++)
		{
			this.field.getCard(all_cards[i]).onTurn(manipulator);
		}
	}
	// used if the enemy plays a card
	setCard(info)
	{
		var card = new cards[info.cardid];
		this.field.setCardPos(info.pos, card);
		card.setPos(info.pos);
		card.play();
	}
	
	removeHandCard(pos)
	{
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
	
	setHealth(health) {
		this.hp = health;
	}
	
	getPos() {
		return {row: "Players", index: 0};
	}
	
}

module.exports = player;