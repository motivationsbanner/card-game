"use strict";

var cardTypes = [
	{name: "Armbrustschütze"},
	{name: "Bauer"},
	{name: "Bogenschütze"},
	{name: "Kavallerist"},
	{name: "Krieger"},
	{name: "Schwertkämpfer"},
	{name: "Soldat"}
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
	
	return new karten[cardType.name];
}

module.exports = gc;



/*
var Soldier = require(__dirname + '/Minions/Soldat.js');
var Bauer = require(__dirname + '/Minions/Bauer.js');
var Bogenschütze = require(__dirname + '/Minions/Bogenschütze.js');
var Kavallerist = require(__dirname + '/Minions/Kavallerist.js');
var Krieger = require(__dirname + '/Minions/Krieger.js');
var Schwertkämpfer = require(__dirname + '/Minions/Schwertkämpfer.js');
var Armbrustschütze = require(__dirname + '/Minions/Armbrustschütze.js');
*/