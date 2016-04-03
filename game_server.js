var http = require('http'),
    fs = require('fs'),
    index = fs.readFileSync(__dirname + '/index.html');
	
	//Load Modules 
var functions = require('functions.js'),
	game_function = require('game_function.js');
	
// Games and Players Array
var games = game_function.GameMethods("games"),
	players = game_function.GameMethods("players");

// Some cool variables that are kinda outdated
var ppl = 0;

// Send index.html to all requests
var app = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});

var io = require('socket.io').listen(app);

var port = 8000;
if(process.argv.length == 3 && !isNaN(process.argv[2])) {
	port = parseInt(process.argv[2]);
}

app.listen(port, function(){
  console.log('listening on *:' + port);
});

io.sockets.on('connection', function(client)
{	
	ppl++;
	
	// Add Client to Player Array
	players.add(client);
	
	// Check if there are enough players waiting
	var game = players.checkRdy();
	if (game != false)
		startGame(game);
	else
		client.emit('system', 'Waiting for another Player.  ¯\\_(ツ)_/¯  We are sorry.');
	
		
	// We could just comment the 'message' block out.. but lets leave it here.
	// Used for the chat
	client.on('message', function(msg)
	{
		msg.username = htmlspecialchar(msg.username);
		msg.chat = htmlspecialchar(msg.chat);
		
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
		
		if ( players.players.indexOf( client ) != -1 )
			players.players.splice( players.players.indexOf( client ), 1); // Remove waiting player
		else
			clean ( getGameIndexByClient ( client ) , client );
		ppl--;
	});
});

// Removes the Game that is empty and adds the other player in the Queue (Player Array)
// Starts a new Game if there is another Player waiting
function clean (gameIndex, client)
{
	var lastPlayer = getLastPlayerInGame( gameIndex , client );
	games.remove( gameIndex );
	if (lastPlayer != -1)
	{
		
		lastPlayer.emit('system', 'Your Opponent left, please reload to start a new game');
		 
		
		/*
		lastPlayer.emit('system', 'Your Opponent left the Game, we are starting a new one though!');
		players.add( lastPlayer ); 
		
		var game = players.checkRdy();
		
		if (game != false)
			startGame(game);
		else
			lastPlayer.emit('system', 'Your Opponent left the Game, waiting for a new Player.  ¯\\_(ツ)_/¯  We are sorry.');
		*/
	} else 
	{
		players.players.splice( players.players.indexOf( client ), 1);
	}
	
}

// Starts the new Game
// -> Sends 3 Cards to each Player and tells Player am_zug that it is his turn
function startGame(game)
{
	// Add the Game to the Games Array
	games.add(game);
	
	// Send a message to the Players of the Game
	var message = "Start Game: Game NR. " + ( games.games.length);
	game_message( game , message );
	
	// Give 3 cards to each player
	game.nicht_am_zug.client.emit('draw', game.nicht_am_zug.draw(3));
	game.am_zug.client.emit('draw', game.am_zug.draw(3));
	
	// it's am_zugs turn:)
	game.am_zug.client.emit('begin_turn', "ROFL UR TURN M8 KEK");
}	

// Returns  the Player that is in a Game
// Player = Player that left
function getLastPlayerInGame(gameIndex, player)
{
	try 
	{
		// p1 & p2 are both Clients
		var p1 = games.games[gameIndex].player1.getClient();
		var p2 = games.games[gameIndex].player2.getClient();
		
		// Return the Player that did not leave 
		if ( p1 == player )
			return p2;
		if ( p2 == player )
			return p1;
	}
	// if there is an error, this means that there is no game anymore and someone is waiting in queue that shouldn't be.
	catch (err)
	{
		return -1;
	}
	
}

// Loop through all Games in the Game Array
// Returns the index of the Game in that the Client is playing
function getGameIndexByClient(client)
{
	for ( i = 0; i < games.games.length; i++ )
	{	
		var game = games.games[i];
		if ( game.player1.getClient() == client )
		{
			return i;
			break;
		}
		if ( game.player2.getClient() == client )
		{
			return i;
			break;
		}
	}
}

// -- MESSAGE FUNCTIONS -- //

// Sends a message to the players of a game
function game_message( game, message ) 
{
	game.player1.client.emit('system', message);
	game.player2.client.emit('system', message);
}

// Sends a Systemmessage to all connected clients.
function system_message(message)
{
	io.emit('system', message);
}

// -- OTHER FUNCTIONS -- //

// HTMLSPECIALCHAR
function htmlspecialchar(string)
	{
		var regex = /(<([^>]+)>)/ig;
		var body = string;
		var result = body.replace(regex, "");
		return result;
	};
