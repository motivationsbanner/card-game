/**
 * card game
 * client: https://github.com/cravay/card-game
 * server: https://github.com/ceoy/Nodejs
 */

"use strict";

var commandQueue = [];

function recieveCommand(data) {
	console.info("recieved command: " + JSON.stringify(data));

	commandQueue.push(data);

	if(commandQueue.length == 1) {
		runCommand();
	}
}

function sendCommand(data) {
	socket.emit("command", data);
	console.info("sent command: " + JSON.stringify(data));
}

// I hope nobody ever sees this ...
// Ceoy: I saw it:3
function runCommand() {
	if(commandQueue.length === 0) {
		return;
	}

	var data = commandQueue[0];

	// TODO: asyncCommands = [{command: ..., function : ...}], syncCommands = ..., loop
	switch(data.command) {
		case "draw":
			if(data.cards) {
				playerDrawCards(data.cards, function() {
					commandQueue.shift();
					runCommand();					
				});
			} else {
				enemyDrawCards(data.amount, function() {
					commandQueue.shift();
					runCommand();
				});
			}
			break;

		case "play_options":
			setPlayOptions(data.options);
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
			kill(data.target, function() {
				commandQueue.shift();
				runCommand();
			});
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

		case "cast_spell":
			castSpell(data.sender, data.card_name, function() {
				commandQueue.shift();
				runCommand();
			});
			break;

		case "name":
			rows.Players[0].name = data.name;
			commandQueue.shift();
			runCommand();
			break;

		case "start_turn":
			startTurn();
			commandQueue.shift();
			runCommand();
			break;

		case "end_turn":
			endTurn();
			commandQueue.shift();
			runCommand();
			break;

		case "end_game":
			endGame(data.winner);
			break;

		default:
			console.warn(data.command + " command not (yet) implemented");
			commandQueue.shift();
			runCommand();
	}
}
