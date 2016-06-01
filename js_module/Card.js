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
		this.isOnField = false;
	}
	
	getType()
	{
		return this.cardType;
	}
	
	isPlayable(field)
	{
		return -1;
	}
	
	play(pos, field)
	{
		var row = pos.row,
			index = pos.index;
		if (field.getCardOnPos(pos) == -1)
		{
			field.setCardPos(pos, this);
		}
		this.isOnField = true;
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
	
	isPlayable(field)
	{
		if (this.isOnField)
		{
			// if card is already on the field
		} else {
			// if card is in your hand
			var f = field.getField().range;
			var playable = new Array();
			for (var i = 0; i < f.length; i++)
			{
				if (f[i] == -1)
					playable.push( {row: 'PlayerRange', index: f[i]} );
			}	
			return playable;
		}
	}
}

class MeleeMinion extends Minion {
	constructor (cardType)
	{
		super( cardType );
	}
	
	isPlayable(field)
	{
		if (this.isOnField)
		{
			// if card is already on the field
		} else {
			// if card is in your hand
			var f = field.getField().melee;
			var playable = new Array();
			for (var i = 0; i < f.length; i++)
			{
				if (f[i] == -1)
					playable.push( {row: 'PlayerMelee', index: f[i]} );
			}	
			return playable;
		}
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
	console.log(id);
	
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