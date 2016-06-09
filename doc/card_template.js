/* Card Template by Ceoy */

/*

Row (in this order, from top to bottom):
	EnemyHand,		(x cards) Cardname
	EnemyRange,		(5 cards) Cardobject
	EnemyMelee,		(5 cards) Cardobject
	PlayerMelee,	(5 cards) Cardobject
	PlayerRange,	(5 cards) Cardobject
	PlayerHand		(x cards) Cardname

Command:
	{command: "set_health", target: position, health: int}
	{command: "set_attack", target: position, attack: int}
	{command: "kill", target: position}
	{command: "cast_spell", target: position}
    {command: "play_card", sender: pos: position, to: position, card_name: string}
	
Some important commands for the field:

getCardOnPos(pos)
	pos: {row, index}
	returns: card object

getFieldsWithCards(friendly) 
	friendly:
		-> true: your fields with cards
		-> false: enemy fields with cards
	returns: fields [ { row, index } ]
	
getRow(row)
	row: row
	returns: [ Cardobject / -1 ] // -1 == no card

removeCard(pos) -> remove a card at the position
	pos: {row, index}
	returns: new field

getHandCard(index) -> gets a cardname from your hand
	index: int
	returns: Cardname


Some important commands for the game

drawCard(amount) -> you will draw a card for yourself
	amount: int

sendCommand(command) -> send a command to both players
	command: command to send -> see protocol.md
	
	
Some General information
Create a new Cardobject: new cards[cardname]

if you change something on the field, dont forget to tell the clients that!

*/

"use strict";



// set your flavor text.
var text = "";
// set health and attack, for a spell take 0;
var health = 0;
var attack = 0;

// Choose the right one and delete the others
var type = require(__dirname + '/../RangedMinion.js');
var type = require(__dirname + '/../MeleeMinion.js');
var type = require(__dirname + '/../Spell.js');


class classname extends type {
	constructor ()
	{
		super();
	}

	activate(target, game)
	{
		// target: {row, index}
		
		var player = game.getOnTurn();
		var enemy = game.getNotOnTurn();
		var field = player.field;
		
	}
	
	// Remove if you don't want to implement any specifics
	isPlayable(field)
	{
		if (this.isOnField)
		{
			// if card is already on the field (should not happen tho)
		} else {
			var playable = new Array();
			var f = field.getRow(Row);
				if (f[i] == -1)
					playable.push( {row: 'PlayerRange', index: i} );
			
			// has to be formatted like this: [ {row: Row, index: int } ]
			return playable;
		}		
	}
	
	
	
	// DO NOT CHANGE
	static get name() {
		return "Armbrustschütze";
	}
	
	// DO NOT CHANGE
	static get text() {
		return text;
	}
	
	// DO NOT CHANGE
	static get attack() {
		return attack;
	}
	
	// DO NOT CHANGE
	static get health() {
		return health;
	}
}

Classname.name = "Arm...";

module.exports = Classname;