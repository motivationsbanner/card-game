/**
 * card game
 * client: https://github.com/cravay/card-game
 * server: https://github.com/ceoy/Nodejs
 */

"use strict";

var width = 5; // width of the board (in cards)
var gap = 6; // gap between fields
var containerBorder = {left: 0, right: 8}; // Border of the container on the left
var artworkDimensions = {width: 250, height: 350};
var largeCardDimensions = {width: 160, height: 300};
var smallCardDimensions = {width: 50, height: 70};
var playerDimensions = {width: 105, height: 70};
var endTurnButtonDimensions = {width: 70, height: 30 * 0.7};
var borderSizes = [smallCardDimensions, playerDimensions];
var borderColors = ["white", "red"];

var rowNames = [
	"EnemyHand",
	"EnemyRange",
	"EnemyMelee",
	"PlayerMelee",
	"PlayerRange",
	"PlayerHand",
	"Players" // Enemy: index = 0, Player: index = 1
];
