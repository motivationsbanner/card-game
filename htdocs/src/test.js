/**
 * card game
 * client: https://github.com/cravay/card-game
 * server: https://github.com/ceoy/Nodejs
 */

"use strict";

function test() {
	playerDrawCards([0, 1, 2, 3, 4, 5, 6]);
	startPlayerTurn();
	startEnemyTurn();
	enemyDrawCards(7);
}
