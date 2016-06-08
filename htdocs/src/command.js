/**
 * card game
 * client: https://github.com/cravay/card-game
 * server: https://github.com/ceoy/Nodejs
 */

"use strict";

window.sendCommand = function(data) {
	socket.emit("command", data);
	console.info("sent command: " + JSON.stringify(data));
}

window.recieveCommand = function(data) {
	console.info("recieved command: " + JSON.stringify(data));
	switch(data.command) {
		case "draw":
			if(data.cards) {
				playerDrawCards(data.cards);
			} else {
				enemyDrawCards(data.amount);
			}
			break;
		case "play_options":
			setPlayOptions(data.options, data.abort);
			break;
		case "play_card":
			playCard(data.sender, data.to, data.card_name);
			break;
		case "set_health":
			setHealth(data.target, data.health);
			break;
		case "set_attack":
			setAttack(data.target, data.attack);
			break;
		default:
			console.warn(data.command + " command not (yet) implemented");
	}
}
