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

module.exports = RangedMinion;