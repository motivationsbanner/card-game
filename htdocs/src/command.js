/**
 * card game
 * client: https://github.com/cravay/card-game
 * server: https://github.com/ceoy/Nodejs
 */

"use strict";

var commandQueue = [];

window.recieveCommand = function(data) {
	console.info("recieved command: " + JSON.stringify(data));

	commandQueue.push(data);

	if(commandQueue.length == 1) {
		runCommand();
	}
}

window.sendCommand = function(data) {
	socket.emit("command", data);
	console.info("sent command: " + JSON.stringify(data));
}

// I hope nobody ever sees this ...
function runCommand() {
	if(commandQueue.length === 0) {
		return;
	}

	var data = commandQueue[0];

	switch(data.command) {
		case "draw":
			if(data.cards) {
				playerDrawCards(data.cards);
			} else {
				enemyDrawCards(data.amount);
			}
			commandQueue.shift();
			runCommand();
			break;

		case "play_options":
			setPlayOptions(data.options, data.abort);
			commandQueue.shift();
			runCommand();
			break;

		case "play_card":
			playCard(data.sender, data.to, data.card_name, function() {
				commandQueue.shift();
				runCommand();
			});
			break;

		case "set_health":
			setHealth(data.target, data.health);
			commandQueue.shift();
			runCommand();
			break;

		case "set_attack":
			setAttack(data.target, data.attack);
			commandQueue.shift();
			runCommand();
			break;

		case "kill":
			kill(data.target);
			commandQueue.shift();
			runCommand();
			break;

		case "attack":
			attack(data.attacker, data.target, function() {
				commandQueue.shift();
				runCommand();
			});
			break;

		case "glow":
			glow(data.target, data.color, function() {
				commandQueue.shift();
				runCommand();
			});
			break;

		default:
			console.warn(data.command + " command not (yet) implemented");
			commandQueue.shift();
			runCommand();
	}
}
