/**
 * card game
 * client: https://github.com/cravay/card-game
 * server: https://github.com/ceoy/Nodejs
 */

"use strict";

function start() {
	socket.emit("start");
	hideInfo();

	if(document.location.search !== "?noserver") {
		socket.on("command", function(data) {
			recieveCommand(data);
		});
	} else {
		// suppress error
		window.sendCommand = function(){};
	}
}
