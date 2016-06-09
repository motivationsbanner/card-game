"use strict";

class Card {
	constructor ()
	{
		this.isOnField = false;
	}
	
	play(pos, field)
	{
		var row = pos.row,
			index = pos.index;
		
		this.isOnField = true;
		if (field.getCardOnPos(pos) == -1)
		{
			field.setCardPos(pos, this);
			return field;
		}
		return field;
	}
	
	isPlayable(field) {
		return -1;
	}
}

module.exports = Card;