/**
 * card game
 * client: https://github.com/cravay/card-game
 * server: https://github.com/ceoy/Nodejs
 */

(function() {
	var commands = [ "!people", "!kick" ];
	module.exports = {
		isCommand : function(s) {
				return (commands.indexOf(s) > -1) ? true : false; 
		}
	};
}());