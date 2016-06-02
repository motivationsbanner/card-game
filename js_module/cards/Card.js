"use strict";

var card = class Card {
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

module.exports = card;