/**
 * card game
 * client: https://github.com/cravay/card-game
 * server: https://github.com/ceoy/Nodejs
 */

"use strict";

// TODO: remove this file
var cardTypes = [
	{name: "Armbrustschütze", imageName: "armbrustschütze.png", text: "", type: "minion", data: {"attack": 1, "health": 1, type: "ranged"}},
	{name: "Bauer", imageName: "bauer.png", text: "", type: "minion", data: {"attack": 1, "health": 1, type: "melee"}},
	{name: "Bogenschütze", imageName: "bogenschütze.png", text: "", type: "minion", data: {"attack": 1, "health": 1, type: "ranged"}},
	{name: "Kavallerist", imageName: "kavallerist.png", text: "", type: "minion", data: {"attack": 1, "health": 1, type: "melee"}},
	{name: "Krieger", imageName: "krieger.png", text: "", type: "minion", data: {"attack": 1, "health": 1, type: "melee"}},
	{name: "Schwertkämpfer", imageName: "schwertkämpfer.png", text: "", type: "minion", data: {"attack": 1, "health": 1, type: "melee"}},
	{name: "Soldat", imageName: "soldat.png", text: "", type: "minion", data: {"attack": 1, "health": 1, type: "melee"}}
];

var cardTypesByName = {};

// temporary
for(var cardType of cardTypes) {
	cardTypesByName[cardType.name] = cardType;
}
