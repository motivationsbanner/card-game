"use strict";

var Player = require('../js_module/Player.js');
var commandInterpreter = require('../js_module/Command.js');
var FieldManipulator = require('../js_module/FieldManipulator.js');
var Conditions = require('../js_module/Conditions.js');

class Game {
	constructor ()
	{
		this.p1 = new Player();
		this.p2 = new Player();
		
		var rnd = Math.floor((Math.random() * 2) + 1);
		if (rnd == 1)
		{
			this.on_turn = this.p1;
			this.not_turn = this.p2;
		}
		
		if (rnd == 2)
		{
			this.on_turn = this.p2;
			this.not_turn = this.p1;
		}
		
		this.rounds = 0;
		this.finished = false;
		this.manipulator = new FieldManipulator(this);
		this.conditions = new Conditions(this);
	}
	
	changeTurn()
	{
		this.on_turn.onTurnEnd(this.manipulator);
		this.on_turn.endTurn();
		
		var temp = this.on_turn;
		this.on_turn = this.not_turn;
		this.not_turn = temp;
		this.on_turn.sendCommandMessage({command: "start_turn"});
		
		this.not_turn.sendSystemMessage('It is not your turn, please wait.');
		this.on_turn.sendSystemMessage('It is your turn!');
		
		this.manipulator.changeTurn();
		this.conditions.changeTurn();
		
		this.on_turn.onTurn(this.manipulator);
	}
	
	sendMessage(message)
	{
		this.p1.sendSystemMessage(message);
		this.p2.sendSystemMessage(message);
	}
	
	
	start()
	{
		// Both Players get 3 Cards
		this.p1.draw(3, this.manipulator);
		this.p2.enemyDraw(3);
		
		this.p2.draw(3, this.manipulator);
		this.p1.enemyDraw(3);
				
		// Player 1 gets 1 card, cus it's his turn
		this.on_turn.draw(1, this.manipulator);
		this.not_turn.enemyDraw(1);
		
		//Player 2 draws 2 cards, cus for balancing reasons
		this.not_turn.draw(2, this.manipulator);
		this.on_turn.enemyDraw(2);
		
		
		this.on_turn.sendSystemMessage('It is your turn!');
		this.on_turn.sendCommandMessage({command: "start_turn"});
		this.not_turn.sendSystemMessage('It is not your turn, please wait.');
		
		this.playOptions();
	}
	
	currentCardActivate(pos) {
		this.on_turn.currentCardActivate(pos, this, this.manipulator);
	}
	
	getPlayerByClient(client)
	{
		if ( this.getP1Client() == client ) return this.p1;
		if ( this.getP2Client() == client ) return this.p2;
		return -1;
	}
		
	doCommand(data, client) {
		commandInterpreter(data, this.getPlayerByClient(client), this);
	}
	
	playOptions()
	{
		var options = this.on_turn.getPlayOptions(this.conditions);
		var abortPos = this.on_turn.getSelectedCard();
		if (abortPos != -1)
			options.push( {pos: abortPos, color: "red"} );
		var command = {command: "play_options", options: options};
		this.on_turn.sendCommandMessage( command );
	}
	
	drawCard(amount)
	{
		var success = this.on_turn.draw(amount, this.manipulator);
		
		if (success) 
			this.not_turn.enemyDraw(amount);
		else
			this.not_turn.sendCommandMessage({command: "overdraw", card: amount});
	}
	
	end()
	{
		this.sendMessage('The Game has ended, please reload to start a new one!');
		this.finished = true;
		delete this.p1;
		delete this.p2;
	}
	
	getP1()	{
		return this.p1;
	}
	
	getP2()	{
		return this.p2;
	}
	
	getP1Client() {
		return this.p1.getClient();
	}
	
	getP2Client() {
		return this.p2.getClient();
	}
	setP1(client) {
		this.p1.setClient(client);
	}
	
	setP2(client) {
		this.p2.setClient(client);
	}
	
	getOnTurn()	{
		return this.on_turn;
	}
	
	getNotOnTurn() {
		return this.not_turn;
	}
	
	sendCommand(command) 
	{
		this.on_turn.sendCommandMessage(command);
		this.not_turn.sendCommandMessage(command);
	}
		
	join(playerID, client)
	{
		if (this.p1.playerID === playerID)
		{
			// Need p2 informations
			var obj = {};
			obj.name = this.p2.name;
			obj.health = this.p2.hp;
			obj.deckSize = this.p2.deck.deck.length;
			obj.on_turn = this.on_turn;
			this.p1.join(client, obj);
		}
			
		if (this.p2.playerID === playerID)
		{
			// Need p1 informations
			var obj = {};
			obj.name = this.p1.name;
			obj.health = this.p1.hp;
			obj.deckSize = this.p1.deck.deck.length;
			obj.on_turn = this.on_turn;
			this.p2.join(client, obj);
		}
	}
}

module.exports = function game()
{
	return new Game(); 
}
