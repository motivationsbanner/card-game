/**
 * card game
 * client: https://github.com/cravay/card-game
 * server: https://github.com/ceoy/Nodejs
 */

"use strict";
var player = require('../js_module/Player.js');
var commandInterpreter = require('../js_module/Command.js');

class Game {
	constructor ()
	{
		this.p1 = player();
		this.p2 = player();
		this.on_turn = this.p1;
		this.not_turn = this.p2;
		this.rounds = 0;
	}
	
	changeTurn()
	{
		var temp = this.on_turn;
		this.on_turn = this.not_turn;
		this.not_turn = temp;
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
		
		this.playOptions();
	}
	
	getPlayerByClient(client)
	{
		if ( this.getP1Client() == client ) return this.p1;
		if ( this.getP2Client() == client ) return this.p2;
		return -1;
	}
	
	doCommand(data, client)
	{
		commandInterpreter(data, this.getPlayerByClient(client), this);
	}
	
	playOptions()
	{
		var options = this.on_turn.getPlayOptions();
		var abortPos = this.on_turn.getSelectedCard();
		var command = {command: "play_options", options, abort: abortPos};
		this.on_turn.sendCommandMessage( command );
	}
	
	getP1()
	{
		return this.p1;
	}
	
	getP2()
	{
		return this.p2;
	}
	
	getP1Client()
	{
		return this.p1.getClient();
	}
	
	getP2Client()
	{
		return this.p2.getClient();
	}
	setP1(client)
	{
		this.p1.setClient(client);
	}
	
	setP2(client)
	{
		this.p2.setClient(client);
	}
	
	getOnTurn()
	{
		return this.on_turn;
	}
	
	getNotOnTurn()
	{
		return this.not_turn;
	}
}

module.exports = function game()
{
	return new Game(); 
}