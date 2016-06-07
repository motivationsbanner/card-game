/**
 * card game
 * client: https://github.com/cravay/card-game
 * server: https://github.com/ceoy/Nodejs
 */

"use strict";

var width = 5; // width of board
var gap = 6; // gap between fields
var originalCardDimensions = {width: 250, height: 350};
var largeCardDimensions = {width: 125, height: 175};
var smallCardDimensions = {width: 50, height: 70};

var rowNames = [
	"EnemyHand",
	"EnemyRange",
	"EnemyMelee",
	"PlayerMelee",
	"PlayerRange",
	"PlayerHand"
];
