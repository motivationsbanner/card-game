/**
 * card game
 * client: https://github.com/cravay/card-game
 * server: https://github.com/ceoy/Nodejs
 */

var http = require('http'),
    fs = require('fs'),
    index = fs.readFileSync(__dirname + '/index.html');
var path = "./js_module/";

//Load Modules 

var functions = require(path + 'functions.js'),
	games = require(path + 'GamesArray.js'),
	players = require(path + 'PlayersArray.js');

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
	// Add Client to Player Array
	players.add(client);
	
	// Check if there are enough players waiting
	var game = players.rdy();
	if (game != false)
		startGame(game);
	else
		client.emit('system', 'Waiting for another Player.  ¯\\_(ツ)_/¯  We are sorry.');
	
	client.on('disconnect', function()
	{
		if ( players.getIndex(client) != -1 )
		{
			players.remove(client);	
		} else
		{
			lp = games.clean (client);
			if (lp != -1)
				lp.emit('system', 'Your Opponent disconnected. ¯\\_(ツ)_/¯ Please Reload to start a new Game');
		}
	});
});

// Starts the new Game
// -> Sends 3 Cards to each Player and tells Player am_zug that it is his turn
function startGame(game)
{
	// Add the Game to the Games Array
	games.add(game);
	
	// Send a message to the Players of the Game
	var message = "Start Game: Game NR. " + ( games.getLength());
	game_message( game , message );
	
	// Give 3 cards to each player
	// game.nicht_am_zug.client.emit('command', game.nicht_am_zug.draw(3));
	// game.am_zug.client.emit('command', game.am_zug.draw(3));
	
	// it's am_zugs turn:)
	// game.am_zug.client.emit('begin_turn', "ROFL UR TURN M8 KEK");
}	




// -- MESSAGE FUNCTIONS -- //

// Sends a message to the players of a game
function game_message( game, message ) 
{
	game.p1.getClient().emit('system', message);
	game.p2.getClient().emit('system', message);
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

