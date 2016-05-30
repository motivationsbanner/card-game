/**
 * card game
 * client: https://github.com/cravay/card-game
 * server: https://github.com/ceoy/Nodejs
 */

"use strict";

var field = require('../js_module/Field.js');
var deck = require('../js_module/Deck.js');

class Player {
	constructor ()
	{
		this.client;
		this.hp = 30;
		this.melees = field('melee');
		this.ranges = field('range');
		this.deck = deck();
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
}

module.exports = function player() 
{
	return new Player();
}