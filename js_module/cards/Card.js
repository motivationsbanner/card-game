"use strict";

class Card {
	constructor ()
	{
		this.isOnField = false;
		this.action_done = false;
	}
	
	play(pos, field)
	{
		var row = pos.row,
			index = pos.index;
		
		if (field.getCardOnPos(pos) == -1)
		{
			field.setCardPos(pos, this);
			this.action_done = true;
			this.isOnField = true;
		}
	}
	
	isPlayable(field) {
		return -1;
	}
	
	activate(pos, game) {
		return;
	}
	
	endTurn()
	{
		this.action_done = false;
	}
}

module.exports = Card;