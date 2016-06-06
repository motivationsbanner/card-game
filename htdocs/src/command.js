/**
 * card game
 * client: https://github.com/cravay/card-game
 * server: https://github.com/ceoy/Nodejs
 */

"use strict";

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
		default:
			console.warn(data.command + " command not (yet) implemented");
	}
}