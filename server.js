"use strict";
var fs=require('fs'),
    EventEmitter = require('events').EventEmitter,
    startServer = new EventEmitter();
GLOBAL.cards = [];
var all_cards = [];
	
var http = require('http'),
	express = require('express');

var path = "./js_module/";

// Load Modules 
var functions = require(path + 'functions.js'),
	games = require(path + 'GamesArray.js'),
	players = require(path + 'PlayersArray.js');

// Create Server
var app = express();
app.use(express.static(__dirname + "/htdocs/"));
var server = http.createServer(app);

var io = require('socket.io').listen(server);

var port = process.env.PORT || 8000;
 
if(process.argv.length == 3 && !isNaN(process.argv[2])) {
	port = parseInt(process.argv[2]);
}

fs.readdir(__dirname + '/js_module/cards/objects/', function (error, files)
{
	if (error)
		console.log("readdir error: " + error);
	files.forEach( function(file) {
		var temp = require(__dirname + '/js_module/cards/objects/'+ file);
		cards[temp.nom] = temp;
		var obj = {name: temp.nom, attack: temp.attack, health: temp.health, text: temp.text};
		all_cards.push(obj);
	});
	startServer.emit('cards_ready');
});


startServer.on('cards_ready', function() {
	server.listen(port, function(){
		console.log('listening on *:' + port);
	});
});
		

io.sockets.on('connection', function(client)
{	
	client.emit('cards', all_cards);
	// Add Client to Player Array
	
	client.on('start', function() 
	{
		// Check if there are enough players waiting
		players.add(client);
		
		var game = players.rdy();
		if (game != false)
			startGame(game);
		else
			client.emit('system', 'Waiting for another Player.  ¯\\_(ツ)_/¯  We are sorry.');
		
	});	
	
	client.on('disconnect', function()
	{
		if ( players.getIndex(client) != -1 )
		{
			players.remove(client);	
		} else {
			var lp = games.clean (client);
			if (lp != -1)
				lp.emit('system', 'Your Opponent disconnected. ¯\\_(ツ)_/¯ Please Reload to start a new Game');
		}
	});
	
	client.on('command', function (data)
	{
		games.getGameByClient(client).doCommand(data, client);	
	});
	
	client.on('make_deck', function (data) {
		makeDeck(data, "Deck", client);
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
	game.sendMessage(message);
	game.start();
}	


// -- MESSAGE FUNCTIONS -- //

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

function makeDeck(data, filename, client) {
	var outputFile = __dirname + "/js_module/deck/" + filename + ".json";
	fs.writeFile(outputFile, data, function (err) {
		if (err) {
			console.log("MakeDeck Error: " + err);
		} else {
			client.emit('success');
		}
	});
}

