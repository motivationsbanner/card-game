/**
 * card game
 * client: https://github.com/cravay/card-game
 * server: https://github.com/ceoy/Nodejs
 */

 (function() {
	module.exports = 
	{
		Card : function (cardType) 
		{
			if (cardType
		}
	};
}());

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
		this.attack = cardTypes.data.attack;
		this.health = cardTypes.data.health;
	}
}

class RangedMinion extends Minion {
	constructor (cardType)
	{
		super(cardType)
		
	}
}

class MeeleMinion extends Minion {
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