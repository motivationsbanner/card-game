/**
 * card game
 * client: https://github.com/cravay/card-game
 * server: https://github.com/ceoy/Nodejs
 */

"use strict";

class Player {
	constructor ()
	{
		this.client;
		this.hp = 30;
		// this.meeles = new Field();
		// this.ranges = new Field();
		// this.hand = new Deck();
	}
	
	getClient() {
		return this.client;
	}
	
	setClient(client) {
		this.client = client;
	}
}

module.exports = function player() 
{
	return new Player();
}