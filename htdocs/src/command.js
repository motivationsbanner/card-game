/**
 * card game
 * client: https://github.com/cravay/card-game
 * server: https://github.com/ceoy/Nodejs
 */

"use strict";

// TODO: command queue
var commands = [];

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
			playCard(data.sender, data.to);
			break;
		default:
			console.warn(data.command + " command not (yet) implemented");
	}
}