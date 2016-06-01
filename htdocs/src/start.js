/**
 * card game
 * client: https://github.com/cravay/card-game
 * server: https://github.com/ceoy/Nodejs
 */

"use strict";

function start() {

	window.recieveCommand = function(data) {
		
		switch(data.command) {
			case "draw":
				if(data.cards) {
					playerDrawCards(data.cards);
				} else {
					enemyDrawCards(data.amount);
				}
				break;
			default:
				console.warn(data.command + " command not (yet) implemented");
		}
	}

	if(document.location.search !== "?noserver") {
		var socket = io();

		showInfo("Connecting to the server ...");

		window.sendCommand = function(data) {
			socket.emit("command", data);
		}

		socket.on("connect", function() {
			hideInfo();
		});

		socket.on("command", function(data) {
			window.recieveCommand(data);
		});

		socket.on("system", function(data) {
			showInfo(data);
		});

		socket.on("reconnect_attempt", function(data) {
			showInfo("Failed to connect, trying again ...");
		});
	}
}
