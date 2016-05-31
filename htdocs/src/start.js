/**
 * card game
 * client: https://github.com/cravay/card-game
 * server: https://github.com/ceoy/Nodejs
 */

function start() {
	var socket = io();
	showInfo("Connecting to the server ...");

	socket.on("connect", function() {
		hideInfo();
	});

	socket.on("command", function(data) {
		if(data.command == "draw") {
			if(data.cards) {
				playerDrawCards(data.cards);
			} else {
				enemyDrawCards(data.amount);
			}
		}
	});
	socket.on("system", function(data) {
		showInfo(data);
	});

	socket.on("reconnect_attempt", function(data) {
		showInfo("Failed to connect, trying again ...");
	});
}
