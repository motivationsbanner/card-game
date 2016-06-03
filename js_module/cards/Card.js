"use strict";

var card = class Card {
	constructor (cardType, id)
	{
		this.cardType = cardType;
		this.isOnField = false;
		this.name = id;
		this.id = -1;
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
	
	getId() {
		return this.id;
	}
	
	getType() {
		return this.cardType;
	}
	
	isPlayable(field) {
		return -1;
	}
	
	getName() {
		return this.name;
	}
}

module.exports = card;