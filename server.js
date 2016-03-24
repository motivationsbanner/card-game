var http = require('http'),
    fs = require('fs'),
    // NEVER use a Sync function except at start-up!
    index = fs.readFileSync(__dirname + '/index.html');

// Send index.html to all requests
var app = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});

var io = require('socket.io').listen(app);

io.on('connection', function(socket)
{
	socket.broadcast.emit('message', {chat:'Stranger connected', username:'System'});
	socket.on('message', function(msg)
	{
		msg.username = strip(msg.username);
		msg.chat = strip(msg.chat);
		console.log(msg.chat + " " + msg.username);
		socket.broadcast.emit('message', msg);
	});
	
	socket.on('disconnect', function()
	{
		socket.broadcast.emit('message', {chat:'Stranger disconnected', username:'System'});
	});
});


app.listen(3000, function(){
  console.log('listening on *:3000');
});

function strip(string)
	{
		var regex = /(<([^>]+)>)/ig;
		var body = string;
		var result = body.replace(regex, "");
		return result;
	}