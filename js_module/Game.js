/**
 * card game
 * client: https://github.com/cravay/card-game
 * server: https://github.com/ceoy/Nodejs
 */

"use strict";
var player = require('../js_module/Player.js');

class Game {
	constructor ()
	{
		this.p1 = player();
		this.p2 = player();
		this.on_turn = this.p1;
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
	
	setP1(client)
	{
		this.p1.setClient(client);
	}
	
	setP2(client)
	{
		this.p2.setClient(client);
	}
	
	sendMessage(message)
	{
		this.p1.sendSystemMessage(message);
		this.p2.sendSystemMessage(message);
	}
	
	start()
	{
		p1.draw(3);
		p2.draw(3);
		p2.sendCommandMessage({command: "end_turn"});
		p1.sendCommandMessage({command: "begin_turn"});
		p1.draw(1);
		
	}
}

module.exports = function game()
{
	return new Game(); 
}