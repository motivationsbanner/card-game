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
		var playable = [];
		if (!this.action_done)
		{
			if (this.isOnField) 
			{
				// Card is on field already-> Check what i can attack
				
				// Melee -> get all enemy Cards
				var m = field.getField().enemyMelee;
				console.log(m);
				for ( var i = 0; i < m.length; i++)
				{
					if (m[i] != -1)
						playable.push( {row: 'EnemyMelee', index: i} );
				}
				
				if (playable.length == 0) // There are no Enemy Melees
				{
					var r = field.getField().enemyRange;
					
					for ( var j = 0; j < r.length; j++)
					{
						if (r[j] != -1)
							playable.push( {row: 'EnemyRange', index: j} );
					}
					playable.push( {row: 'Player', index: 0} );
				}
				
			} else {
				// Card is not on the field
				var f = field.getField().melee;
				for (var i = 0; i < f.length; i++)
				{
					if (f[i] == -1)
						playable.push( {row: 'PlayerMelee', index: i} );
				}				
			}
		}
		return playable;
	}
	
	activate (target, game)
	{
		// Check if there are 
	}
	
}

module.exports = MeleeMinion;