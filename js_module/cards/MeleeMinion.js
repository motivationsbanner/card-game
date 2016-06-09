"use strict";

var Minion = require(__dirname + '/Minion');

class MeleeMinion extends Minion {
	constructor ()
	{
		super();
	}
	
	isPlayable(field)
	{
		return true;
	}
	
	getPlayableFields(field)
	{
		var f = field.getField().melee;
		var playable = [];
		for (var i = 0; i < f.length; i++)
		{
			if (f[i] == -1)
				playable.push( {row: 'PlayerMelee', index: i} );
		}	
		return playable;
	}
	
}

module.exports = MeleeMinion;