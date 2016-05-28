/**
 * card game
 * client: https://github.com/cravay/card-game
 * server: https://github.com/ceoy/Nodejs
 */

"use strict";

class Card {
	constructor (cardType)
	{
		this.cardType = cardType;
	}
}

class Minion extends Card {
	constructor (cardType)
	{
		super( cardType );
		this.attack = cardType.data.attack;
		this.health = cardType.data.health;
	}
}

class RangedMinion extends Minion {
	constructor (cardType)
	{
		super(cardType)
		
	}
}

class MeleeMinion extends Minion {
	constructor (cardType)
	{
		super( cardType );
	}
}

class Spell extends Card {
	constructor (cardType)
	{
		super( cardType );
	}
}
		

var cardTypes = [
	{name: "Armbrustschütze", imageName: "armbrustschütze.png", text: "", type: "minion", data: {"attack": 1, "health": 1, type: "ranged"}},
	{name: "Bauer", imageName: "bauer.png", text: "", type: "minion", data: {"attack": 1, "health": 1, type: "melee"}},
	{name: "Bogenschütze", imageName: "bogenschütze.png", text: "", type: "minion", data: {"attack": 1, "health": 1, type: "ranged"}},
	{name: "Kavallerist", imageName: "kavallerist.png", text: "", type: "minion", data: {"attack": 1, "health": 1, type: "melee"}},
	{name: "Krieger", imageName: "krieger.png", text: "", type: "minion", data: {"attack": 1, "health": 1, type: "melee"}},
	{name: "Schwertkämpfer", imageName: "schwertkämpfer.png", text: "", type: "minion", data: {"attack": 1, "health": 1, type: "melee"}},
	{name: "Soldat", imageName: "soldat.png", text: "", type: "minion", data: {"attack": 1, "health": 1, type: "melee"}}
];


// THANKS MICHU KEK
function cardFactory(cardType) {
	if(cardType.type == "minion")
	{
		return minionFactory(cardType);
	}

	if(cardType.type == "spell")
	{
		return new Spell(cardType);
	}
}

// THANKS MICHU KEK
function minionFactory(cardType) {
	if(cardType.data.type == "ranged") {
		return new RangedMinion(cardType);
	}
	
	if(cardType.data.type == "melee") {
		return new MeleeMinion(cardType);
	}
	
	throw "a minion neither ranged nor melee";
}

module.exports = function card(id)
{
	var cardType = cardTypes[id];
	
	return cardFactory(cardType);
}

/*
  {command: "draw", cards: [...]}
	{command: "attack", attacker: ..., target: ...}
    {command: "begin_turn"}
    {command: "end_turn"}
    {command: "damage", target: ..., damage: ...}
    {command: "heal", target: ..., heal: ...}
    {command: "minion_passive", target: ...}
    {command: "kill", target: ...}
    {command: "cast_spell", target: ...}
    {command: "buff", target: ..., health: ..., attack: ...}
*/