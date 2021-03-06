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
var endTurnButtonDimensions = {width: 100 * 0.7, height: 30 * 0.7};
var rowDimensions = {width: 274, height: 70};
var twoRowsDimensions = {width: rowDimensions.width, height: 2 * rowDimensions.height + gap};
var borderSizes = [smallCardDimensions, playerDimensions, rowDimensions, twoRowsDimensions];
var borderColors = ["white", "red"];

var rowNames = [
	"EnemyHand",
	"EnemyRange",
	"EnemyMelee",
	"PlayerMelee",
	"PlayerRange",
	"PlayerHand",
	"Players", // Enemy = 0, Player = 1
	"Row" // Top to Bottom (0-3), All Enemy = 4, All Player = 5
];
