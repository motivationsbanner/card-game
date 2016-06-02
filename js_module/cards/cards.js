"use strict";

var Soldier = require(__dirname + '/Soldat.js');
var Bauer = require(__dirname + '/Bauer.js');
var Bogenschütze = require(__dirname + '/Bogenschütze.js');
var Kavallerist = require(__dirname + '/Kavallerist.js');
var Krieger = require(__dirname + '/Krieger.js');
var Schwertkämpfer = require(__dirname + '/Schwertkämpfer.js');
var Armbrustschütze = require(__dirname + '/Armbrustschütze.js');

var cardTypes = [
	{name: "Armbrustschütze", text: "", type: "minion", data: {"attack": 1, "health": 1, type: "ranged"}},
	{name: "Bauer", text: "", type: "minion", data: {"attack": 1, "health": 1, type: "melee"}},
	{name: "Bogenschütze", text: "", type: "minion", data: {"attack": 1, "health": 1, type: "ranged"}},
	{name: "Kavallerist", text: "", type: "minion", data: {"attack": 1, "health": 1, type: "melee"}},
	{name: "Krieger", text: "", type: "minion", data: {"attack": 1, "health": 1, type: "melee"}},
	{name: "Schwertkämpfer", text: "", type: "minion", data: {"attack": 1, "health": 1, type: "melee"}},
	{name: "Soldat", text: "", type: "minion", data: {"attack": 1, "health": 1, type: "melee"}}
];

var gc = function getCard(id)
{
	var cardType = cardTypes[id];
	
	if (cardType.name == "Soldat")
		return new Soldier(cardType, id);
	if (cardType.name == "Bauer")
		return new Bauer(cardType, id);
	if (cardType.name == "Bogenschütze")
		return new Bogenschütze(cardType, id);
	if (cardType.name == "Kavallerist")
		return new Kavallerist(cardType, id);
	if (cardType.name == "Krieger")
		return new Krieger(cardType, id);
	if (cardType.name == "Schwertkämpfer")
		return new Schwertkämpfer(cardType, id);
	if (cardType.name == "Armbrustschütze")
		return new Armbrustschütze(cardType, id);
}

module.exports = gc;

