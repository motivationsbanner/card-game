"use strict";

var Minion = require(__dirname + '/Minion');

class MeleeMinion extends Minion {
	constructor ()
	{
		super();
		this.type = "Melee";
	}
	
	isPlayable(field)
	{
		if (this.isOnField)
		{
			if (this.attack == 0)
				return false;
		}
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
				for ( var i = 0; i < m.length; i++)
				{
					if (m[i] != -1)
						playable.push( {pos: {row: 'EnemyMelee', index: i}, color: "white"} );
				}
				
				if (playable.length == 0) // There are no Enemy Melees
				{
					var r = field.getField().enemyRange;
					
					for ( var j = 0; j < r.length; j++)
					{
						if (r[j] != -1)
							playable.push( {pos: {row: 'EnemyRange', index: j}, color: "white" } );
					}
					playable.push( {pos: {row: 'Players', index: 0}, color: "white" } );
				}
				
			} else {
				// Card is not on the field
				var f = field.getField().melee;
				for (var i = 0; i < f.length; i++)
				{
					if (f[i] == -1)
						playable.push( {pos: {row: 'PlayerMelee', index: i}, color: "white"} );
				}				
			}
		}
		return playable;
	}
	
	activate (target, manipulator)
	{
		manipulator.attack(this, target);
	}
	
}

module.exports = MeleeMinion;