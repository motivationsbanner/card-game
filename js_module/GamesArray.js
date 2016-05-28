/**
 * card game
 * client: https://github.com/cravay/card-game
 * server: https://github.com/ceoy/Nodejs
 */
 
"use strict";
class Games {
	constructor ()
	{
		this.games = new Array();
	}
	
	add(game)
	{
		this.games.push(game);
	}
	remove(game)
	{
		this.games.splice(this.getGameID(game), 1);
	}
	getGameID(game)
	{
		return this.games.indexOf(game);
	}
	getLength()
	{
		return this.games.length;
	}
	getGame(index)
	{
		return this.games[index];
	}
	
	// Loop through all Games in the Game Array
	// Returns the index of the Game in that the Client is playing
	getGameIndexByClient( client )
	{
		for ( var i = 0; i < this.games.length; i++ )
		{
			var game = this.games[i];
			if (game.getP1().getClient() == client)
				return i;
			if (game.getP2().getClient() == client)
				return i;
		}
		return -1;
	}
	
	getLastPlayerInGame(index, player)
	{
		try 
		{
			// p1 & p2 are both Clients
		var p1 = this.getGame(index).getP1().getClient();
		var p2 = this.getGame(index).getP2().getClient();
		
		// Return the Player that did not leave 
		if ( p1 == player )
			return p2;
		if ( p2 == player )
			return p1;
		}
		// This error occurs after one player leaves and the other one reloads (or leaves aswell)
		catch (err)
		{
			return -1;
		}
	}
	
	clean (client)
	{
		var index = this.getGameIndexByClient(client);
		var lastPlayer = this.getLastPlayerInGame(index, client);
		
		
		if (lastPlayer != -1)
			return lastPlayer;
		else
		{
			this.remove(index);
			return -1;
		}
		
	}
}

module.exports = new Games();