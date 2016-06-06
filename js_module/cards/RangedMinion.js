"use strict";

var Minion = require(__dirname + '/Minion.js');

var rangedMinion = class RangedMinion extends Minion {
	constructor ()
	{
		super()
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
					playable.push( {row: 'PlayerRange', index: i} );
			}	
			return playable;
		}
	}
}

module.exports = rangedMinion;