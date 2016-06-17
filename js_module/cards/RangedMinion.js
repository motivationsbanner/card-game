"use strict";

var Minion = require(__dirname + '/Minion.js');

class RangedMinion extends Minion {
	constructor ()
	{
		super()
		this.type = "Range";
	}
	
	isPlayable(condition)
	{
		return true;
	}
	
	getPlayableFields(field)
	{
		var playable = [];
		
		if (this.attack == 0 && this.isOnField)
			return playable;
		
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
				var r = field.getField().enemyRange;
				for ( var j = 0; j < r.length; j++)
				{
					if (r[j] != -1)
						playable.push( {pos: {row: 'EnemyRange', index: j}, color: "white" } );
				}
						
				playable.push( {pos: {row: 'Players', index: 0}, color: "white" } );
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
	
	activate (target, manipulator)
	{
		manipulator.attack(this, target);
	}
}

module.exports = RangedMinion;