var http = require('http'),
    fs = require('fs'),
    // NEVER use a Sync function except at start-up!
    index = fs.readFileSync(__dirname + '/index.html'),
	
	//Load Modules 
	functions = require('functions.js'),
	game_function = require('game_function.js')
	
// Games array
games = game_function.game();

// Some cool variables
var ppl = 0;
var am_zug, nicht_am_zug;
games.push(game_function.game());

// Send index.html to all requests
var app = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});

var io = require('socket.io').listen(app);

app.listen(8000, function(){
  console.log('listening on *:8000');
});

io.on('connection', function(socket)
{	
	ppl++;

	// Check whether or not we can create a new active Player
	// Parameter: socket, so we know who we're talking to:)
	// sidenote: atm there is no need for that check.
	if (!newPlayer(socket))
		socket.emit('system', 'Game full atm.  ¯\\_(ツ)_/¯  We are sorry.');
	else
	{
		// Checks if there are 2 players waiting
		if (checkGame())
			startGame(); // The Game just got full -> we can start playing
		else
			socket.emit('system', 'Waiting for another Player ┗(＾0＾)┓ ');
	}

	// We could just comment the 'message' block out.. but lets leave it here.
	socket.on('message', function(msg)
	{
		msg.username = strip(msg.username);
		msg.chat = strip(msg.chat);
		
		console.log(msg.username + " " + msg.chat);
		socket.broadcast.emit('message', msg);
		
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
	

	socket.on('disconnect', function()
	{
		socket.broadcast.emit('system', 'Someone disconnected');
		ppl--;
	});
});


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
function checkGame()
{
	return (am_zug == games[getGameByPlayer(am_zug)].player1 && nicht_am_zug == games[getGameByPlayer(nicht_am_zug)].player2) ? true : false;
}

// Starts the game by giving each player 3 cards
// TODO: Telling player1 that his turn stards now.
function startGame()
{
	system_message('THE GAME HAS BEGUN!');
	nicht_am_zug.socket.emit('draw', nicht_am_zug.draw(3));
	am_zug.socket.emit('draw', am_zug.draw(3));
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


function getGameByPlayer(player)
{
	return player.gameID;
}

// Still need to implement this
function getEmptyGameId()
{
	// some code
}