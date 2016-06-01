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
		this.p1.draw(3);
		this.p2.enemyDraw(3);
		
		this.p2.draw(3);
		this.p1.enemyDraw(3);
		
		this.p1.sendCommandMessage( {command: "play_options"} );
		
		// , options: p1.getOptions()
		
		this.p1.draw(1);
		this.p2.enemyDraw(1);
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
	
	// From which side you are looking at
	// 1 = p1
	// 2 = p2
	getField(view)
	{
		
	}
}

module.exports = function game()
{
	return new Game(); 
}