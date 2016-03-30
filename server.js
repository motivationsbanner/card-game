var http = require('http'),
    fs = require('fs'),
    // NEVER use a Sync function except at start-up!
    index = fs.readFileSync(__dirname + '/index.html'),
	functions = require('functions.js'),
	game_function = require('game_function.js');
	
var ppl = 0;

// Send index.html to all requests
var app = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});

var io = require('socket.io').listen(app);

io.on('connection', function(socket)
{
	socket.broadcast.emit('message', {chat:'Stranger connected', username:'System'});
	ppl++;
	socket.on('message', function(msg)
	{
		msg.username = strip(msg.username);
		msg.chat = strip(msg.chat);
		
		
		
		console.log(msg.chat + " " + msg.username);
		socket.broadcast.emit('message', msg);
		
		if (functions.isCommand(msg.chat) )
		{
				switch(msg.chat) {
					case "!people":
						io.emit('message', {chat:'People online: ' + ppl, username:'System'});
						break;
					default:
						console.log("error " + msg.chat);
				}
		}
	});
	
	socket.on('disconnect', function()
	{
		socket.broadcast.emit('message', {chat:'Stranger disconnected', username:'System'});
		ppl--;
	});
	
	socket.on('draw_Cards', function()
	{
		socket.emit('draw_Cards', game_function.drawCard());
	});
});

app.listen(8000, function(){
  console.log('listening on *:8080');
});

function strip(string)
	{
		var regex = /(<([^>]+)>)/ig;
		var body = string;
		var result = body.replace(regex, "");
		return result;
	};