"use strict";
class FieldManipulator
{
	constructor (game)
	{
		this.game = game;
	}
	
	attack(attackerCard, defenderPos)
	{
		var field = this.game.on_turn.field;
		var defCard = field.getCardOnPos(defenderPos);
		
		if (defCard != -1)
		{
			
		}
		
	}
	
	
}

module.exports = FieldManipulator;