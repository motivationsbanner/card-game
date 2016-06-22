/**
 * card game
 * client: https://github.com/cravay/card-game
 * server: https://github.com/ceoy/Nodejs
 */

 "use strict";
var game = require('../js_module/Game.js');


class Players {
	constructor ()
	{
		this.players = new Array();
	}
	
	rdy()
	{
		if ( this.players.length >= 2 )
		{
			var g = game();
			g.setP1(this.players[0]);
			g.setP2(this.players[1]);
			g.p1.deck.createDeck(this.players[0].deck);
			g.p2.deck.createDeck(this.players[1].deck);
			
			g.p1.playerID = this.players[0].playerID;
			g.p2.playerID = this.players[1].playerID;
			
			g.p1.name = this.players[0].name;
			g.p2.name = this.players[1].name;
			
			this.players[0].game = g;
			this.players[1].game = g;
			
			this.players.splice( 0,2 );
			return g;
		}
		return null;
	}
	
	remove(client) {
		this.players.splice(this.getIndex(client), 1);
	}
	
	getIndex(client) {
		return this.players.indexOf(client);
	}
	
	add(client) {
		var uuid = guid();
		client.playerID = uuid;
		this.players.push(client);
	}
	
	

}

//http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
function guid() {
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

module.exports = new Players();