"use strict";

class Card {
	constructor ()
	{
		this.isOnField = false;
		this.action_done = false;
	}
	
	play()
	{
			this.action_done = true;
			this.isOnField = true;
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