var http = require('http'),
    fs = require('fs'),
    // NEVER use a Sync function except at start-up!
    index = fs.readFileSync(__dirname + '/index.html'),
	
	//Load Modules 
	functions = require('functions.js'),
	game_function = require('game_function.js')
	
// Games and Players Array
games = game_function.GameMethods("games");
players = game_function.GameMethods("players");

// Some cool variables
var ppl = 0;
var am_zug, nicht_am_zug;

// Send index.html to all requests
var app = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});

var io = require('socket.io').listen(app);

app.listen(8000, function(){
  console.log('listening on *:8000');
});

io.sockets.on('connection', function(client)
{	
	var game;
	ppl++;
	players.add(client);
	// Check if there are enough players waiting
	game = players.checkRdy();
	
	if (game != false)
		startGame(game);
	else
		client.emit('system', 'Waiting for another Player.  ¯\\_(ツ)_/¯  We are sorry.');
	
	/*
	// Check whether or not we can create a new active Player
	// Parameter: client, so we know who we're talking to:)
	// sidenote: atm there is no need for that check.
	if (!newPlayer(client))
		client.emit('system', 'Game full atm.  ¯\\_(ツ)_/¯  We are sorry.');
	else
	{
		// Checks if there are 2 players waiting
		if (checkGame())
			startGame(); // The Game just got full -> we can start playing
		else
			client.emit('system', 'Waiting for another Player ┗(＾0＾)┓ ');
	}
	*/
	
	
	// We could just comment the 'message' block out.. but lets leave it here.
	client.on('message', function(msg)
	{
		msg.username = strip(msg.username);
		msg.chat = strip(msg.chat);
		
		console.log(msg.username + " " + msg.chat);
		client.broadcast.emit('message', msg);
		
		// Checks if the message send is a chatcommand
		if (functions.isCommand(msg.chat) )
		{
				switch(msg.chat) {
					case "!people":
						io.emit('system', 'People online: ' + ppl);
						break;
					default:
						console.log("error " + msg.chat);
				}
		}
	});
	

	client.on('disconnect', function()
	{
		client.broadcast.emit('system', 'Someone disconnected');
		if ( players.players.indexOf( client ) != -1 )
			players.players.splice( players.players.indexOf( client ), 1);
		else
			clean ( getGameByClient(client) , client );
		ppl--;
	});
});
/*
io.sockets.on('connection', function (socket) {
    socket.on('disconnect', function () {
        console.log(socket.id);
    });
});
*/

function clean (gameID, client)
{
	players.add( getLastPlayerInGame( getGameByClient(client) , client ) ); 
	games.remove( getGameByClient (client) );
	
	var game = players.checkRdy();
	
	if (game != false)
		startGame(game);
	else
		client.emit('system', 'Waiting for another Player.  ¯\\_(ツ)_/¯  We are sorry.');
}

// Creates a new Player
// true if successful; false if not
function newPlayer (id)
{
	if (game.player1.getID() == 0)
	{
		game.player1.setID(id);
		am_zug = game.player1;
		return true;
	} else if (game.player2.getID() == 0)
	{
		game.player2.setID(id);
		nicht_am_zug = game.player2;
		return true;
	} else {
		createGame();
		newPlayer (id);
	}
	return false;

}

// Checks if there are 2 player waiting for a game
// Outdated
function checkGame()
{
	return (am_zug == games[getGameByPlayer(am_zug)].player1 && nicht_am_zug == games[getGameByPlayer(nicht_am_zug)].player2) ? true : false;
}

// Starts the game by giving each player 3 cards
// TODO: Telling player1 that his turn stards now.
function startGame(game)
{
	// OLD CODE
	/*
	system_message('THE GAME HAS BEGUN!');
	nicht_am_zug.client.emit('draw', nicht_am_zug.draw(3));
	am_zug.client.emit('draw', am_zug.draw(3));
	*/

	games.add(game);
	console.log(games.games.length);
	system_message("Start game");
}	

// HTMLSPECIALCHAR
function strip(string)
	{
		var regex = /(<([^>]+)>)/ig;
		var body = string;
		var result = body.replace(regex, "");
		return result;
	};

// Sends a Systemmessage to all connected clients.
function system_message(message)
{
	io.emit('system', message);
}

// Creates a new Game Object, puts it in the game array and returns the gameID;
function createEmptyGame()
{
	games.push(game_function.game());
	return games.length - 1;
}


function getLastPlayerInGame(gameID, player)
{
	console.log("getLastPlayerInGame gameID: " + gameID);
	var p1 = games.games[gameID].player1.getClientID();
	var p2 = games.games[gameID].player2.getClientID();
	if ( p1 == player )
		return p2;
	if ( p2 == player )
		return p1;
}	
function getGameByPlayer(player)
{
	return player.gameID;
}

function getGameByClient(client)
{
	for ( i = 0; i < games.games.length; i++ )
	{	
		var game = games.games[i];
		console.log(game);
		if ( game.player1.getClientID() == client )
		{
			return i;
			break;
		}
		if ( game.player2.getClientID() == client )
		{
			return i;
			break;
		}
		console.log("getGameByClient Loop : " + i);
	}
	return -1;
}