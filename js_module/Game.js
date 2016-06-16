"use strict";

var Player = require('../js_module/Player.js');
var commandInterpreter = require('../js_module/Command.js');
var FieldManipulator = require('../js_module/ThisNameWillTriggerCravay.js');

class Game {
	constructor ()
	{
		this.p1 = new Player();
		this.p2 = new Player();
		this.on_turn = this.p1;
		this.not_turn = this.p2;
		this.rounds = 0;
		this.manipulator = new FieldManipulator(this);
	}
	
	changeTurn()
	{
		this.on_turn.endTurn();
		
		var temp = this.on_turn;
		this.on_turn = this.not_turn;
		this.not_turn = temp;
		this.on_turn.sendCommandMessage({command: "start_turn"});
		
		this.on_turn.sendSystemMessage('It is not your turn, please wait.');
		this.not_turn.sendSystemMessage('It is your turn!');
		
		this.manipulator.changeTurn();
	}
	
	sendMessage(message)
	{
		this.p1.sendSystemMessage(message);
		this.p2.sendSystemMessage(message);
	}
	
	
	start()
	{
		// Both Players get 3 Cards
		this.p1.draw(3);
		this.p2.enemyDraw(3);
		
		this.p2.draw(3);
		this.p1.enemyDraw(3);
				
		// Player 1 gets 1 card, cus it's his turn
		this.p1.draw(1);
		this.p2.enemyDraw(1);
		
		this.p1.sendSystemMessage('It is your turn!');
		this.p1.sendCommandMessage({command: "start_turn"});
		this.p2.sendSystemMessage('It is not your turn, please wait.');
		
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
		var options = this.on_turn.getPlayOptions();
		var abortPos = this.on_turn.getSelectedCard();
		if (abortPos != -1)
			options.push( {pos: abortPos, color: "red"} );
		var command = {command: "play_options", options: options};
		this.on_turn.sendCommandMessage( command );
	}
	
	drawCard(amount)
	{
		this.on_turn.draw(amount);
		this.not_turn.enemyDraw(amount);	
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
	
}

module.exports = function game()
{
	return new Game(); 
}
