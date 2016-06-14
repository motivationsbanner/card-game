"use strict";

var Minion = require(__dirname + '/Minion.js');

class RangedMinion extends Minion {
	constructor ()
	{
		super()
	}
	
	isPlayable(field)
	{
		return true;
	}
	
	getPlayableFields(field)
	{
		var playable = [];
		if (!this.action_done)
		{
			if (this.isOnField) 
			{// Card is on field already-> Check what i can attack

				
			} else {
				var f = field.getField().range;
				for (var i = 0; i < f.length; i++)
				{
					if (f[i] == -1)
						playable.push( { pos: {row: 'PlayerRange', index: i}, color: "white" } );
				}
			}
		}
		return playable;
	}
}

module.exports = RangedMinion;