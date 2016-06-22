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
var players = require(path + 'PlayersArray.js');

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
	
	var clients = io.engine.clientsCount;
	client.game = false;
	
	client.emit('cards', all_cards);
	// Add Client to Player Array
	
	
	client.on('start', function(data) 
	{
		var deck = data.deck || false;
		var name = data.name || "Unknown";
		client.deck = deck;
		client.name = name;
	
		players.add(client);
		
		// Check if there are enough players waiting
		var game = players.rdy();
		
		if (game != null)
			startGame(game);
		else
			client.emit('system', 'Waiting for another Player.  ¯\\_(ツ)_/¯  We are sorry. People online: ' + clients);
		
	});	
	
	client.on('spectate', function(data)
	{
		var game = getGame(data.id);
		client.game = "Spectator";
		try	{
			game.join(data.id, client);
		}
		catch (err)	{
			client.emit('system', 'Something went wrong: ' + err + ' ¯\\_(ツ)_/¯  Please reload to try again or contact an admin.');
		}
			
		
	});
	
	client.on('disconnect', function()
	{
		if ( players.getIndex(client) != -1 )
		{
			players.remove(client);	
		} else {
			try 
			{
				if (client.game == "Spectator")
					return;
				if (client.game.finished == true)
					return;
				
				var p1 = client.game.getP1().getClient();
				var p2 = client.game.getP2().getClient();
				
				// Return the Player that did not leave 
				if ( p1 == client )
					p2.emit('system', 'Your Opponent disconnected. ¯\\_(ツ)_/¯ Please reload to start a new Game');
				if ( p2 == client )
					p1.emit('system', 'Your Opponent disconnected. ¯\\_(ツ)_/¯ Please reload to start a new Game');
			} catch (err) {};
		}
	});
	
	client.on('command', function (data)
	{
		if (client.game === "Spectator")
			return;
		client.game.doCommand(data, client);
	});
	
	client.on('chat', function (data)
	{
		var chat_sender = data.sender;
		var chat_msg = htmlspecialchar(data.message);
		var timestamp = getTime();
		var obj = {sender: chat_sender, time: timestamp, message: chat_msg};
		chat_message(obj);
	});
	
});

function startGame(game)
{
	// Send a message to the Players of the Game
	var message = "Start Game";
	game.sendMessage(message);
	game.start();
	
	var name1 = game.p1.client.name;
	var name2 = game.p2.client.name;
	
	game.p1.sendCommandMessage({command: "name", name: name2});
	game.p2.sendCommandMessage({command: "name", name: name1});
	
	var timestamp = getTime();
	var message1 = name1 + ' just started a game, watch him play <a href="http://card-game-dev.herokuapp.com/?spectate=' + game.p1.playerID + '">here</a>';
	var message2 = name2 + ' just started a game, watch him play <a href="http://card-game-dev.herokuapp.com/?spectate=' + game.p2.playerID + '">here</a>';
		
	var obj1 = {sender: "System", time: timestamp, message: message1};
	var obj2 = {sender: "System", time: timestamp, message: message2};
	
	chat_message(obj1);
	chat_message(obj2);
}	

// -- SPECTATER FUNCTIONS -- //

function getGame(playerID)
{
	var allClients = findClientsSocket();
	for (var i = 0; i < allClients.length; i++)
	{
		if (allClients[i].playerID = playerID)
		{
			return allClients[i].game;
		}
	}
}

// http://stackoverflow.com/questions/6563885/socket-io-how-do-i-get-a-list-of-connected-sockets-clients
function findClientsSocket(roomId, namespace) {
    var res = []
    , ns = io.of(namespace ||"/");    // the default namespace is "/"

    if (ns) {
        for (var id in ns.connected) {
            if(roomId) {
                var index = ns.connected[id].rooms.indexOf(roomId) ;
                if(index !== -1) {
                    res.push(ns.connected[id]);
                }
            } else {
                res.push(ns.connected[id]);
            }
        }
    }
    return res;
}

// -- CHAT FUNCTIONS -- //

function getTime()
{
    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    return hour + ":" + min + ":" + sec;
}

// -- MESSAGE FUNCTIONS -- //

// Sends a Systemmessage to all connected clients.
function system_message(message)
{
	io.emit('system', message);
}

function chat_message(message)
{
	io.emit('chat', message);
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

