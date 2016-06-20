"use strict";
// Max smt = Value of smt cant be bigger than max
// Min smt = Value of smt cant be smaller than min
// Amount smt = Value of smt must be at least amount

class Conditions
{
	constructor(game)
	{
		this.game = game;
		this.field = this.game.on_turn.field;
	}
	
	changeTurn()
	{
		this.field = this.game.on_turn.field;
	}

	heroMaxHealth(maxHealth) {
		return (this.game.on_turn.hp <= maxHealth);
	}
	
	heroMinHealth(minHealth)
	{
		return (this.game.on_turn.hp >= minHealth);
	}
	
	enemyHeroMaxHealth(maxHealth)
	{
		return (this.game.not_turn.hp <= maxHealth);
	}
	
	enemyHeroMinHealth(minHealth)
	{
		return (this.game.not_turn.hp >= minHealth);
	}
	
	playerMinionsMinAttack(minAttack)
	{
		var minions = this.field.getFieldCards("Player");
		for (var i = 0; i < minions.length; i++)
		{
			if (minions[i].getAttack() < minAttack)
				return false;
		}
		return true;
	}
	
	playerMeleeMinionsMinAttack(minAttack)
	{
		var minions = this.field.getRow('PlayerRange');
		for (var i = 0; i < minions.length; i++)
		{
			if (minions[i] !== -1)
			{
				if (minions[i].getAttack() > minAttack)
					return false;
			}
		}
		return true;
	}
	
	playerRangeMinionsMinAttack(minAttack)
	{
		var minions = this.field.getRow('PlayerRange');
		for (var i = 0; i < minions.length; i++)
		{
			if (minions[i] !== -1)
			{
				if (minions[i].getAttack() < minAttack)
					return false;
			}
		}
		return true;
	}
	
	playerMinionsMaxAttack(maxAttack)
	{
		var minions = this.field.getFieldCards("Player");
		for (var i = 0; i < minions.length; i++)
		{
			if (minions[i].getAttack() > maxAttack)
				return false;
		}
		return true;
	}
	
	playerMeleeMinionsMaxAttack(maxAttack)
	{
		var minions = this.field.getRow('PlayerMelee');
		for (var i = 0; i < minions.length; i++)
		{
			if (minions[i] !== -1)
			{
				if (minions[i].getAttack() > maxAttack)
					return false;
			}
		}
		return false;
	}
	
	playerRangeMinionsMaxAttack(maxAttack)
	{
		var minions = this.field.getRow('PlayerRange');
		for (var i = 0; i < minions.length; i++)
		{
			if (minions[i] !== -1)
			{
				if (minions[i].getAttack() > maxAttack)
					return false;
			}
		}
		return true;
	}
	
	enemyMinionsMinAttack(minAttack)
	{
		var minions = this.field.getFieldCards('Enemy');
		for (var i = 0; i < minions.length; i++)
		{
			if (minions[i].getAttack < minAttack)
				return false;
		}
		return true;
	}
	
	enemyMeleeMinonsMinAttack(minAttack)
	{
		var minions = this.field.getRow('EnemyMelee');
			for (var i = 0; i < minions.length; i++)
		{
			if (minions[i] !== -1)
			{
				if (minions[i].getAttack() < minAttack)
					return false;
			}
		}
		return true;
	}
	
	enemyRangeMinonsMinAttack(minAttack)
	{
		var minions = this.field.getRow('EnemyRange');
			for (var i = 0; i < minions.length; i++)
		{
			if (minions[i] !== -1)
			{
				if (minions[i].getAttack() < minAttack)
					return false;
			}
		}
		return true;
	}
	
	enemyMinionsMaxAttack(maxAttack)
	{
		var minions = this.field.getFieldCards("Enemy");
		for (var i = 0; i < minions.length; i++)
		{
			if (minions[i].getAttack() > maxAttack)
				return false;
		}
		return true;
	}
	
	enemyMeleeMinionsMaxAttack(maxAttack)
	{
		var minions = this.field.getRow('EnemyMelee');
		for (var i = 0; i < minions.length; i++)
		{
			if (minions[i] !== -1)
			{
				if (minions[i].getAttack() > maxAttack)
					return false;
			}
		}
		return true;
	}
	
	enemyRangeMinionsMaxAttack(maxAttack)
	{
		var minions = this.field.getRow('EnemyRange');
		for (var i = 0; i < minions.length; i++)
		{
			if (minions[i] !== -1)
			{
				if (minions[i].getAttack() > maxAttack)
					return false;
			}
		}
		return true;
	}
	
	minionsMinAttack(minAttack)
	{
		var minions = this.field.getFieldCards('All');
		for (var i = 0; i < minions.length; i++)
		{
			if (minions[i].getAttack < minAttack)
				return false;
		}
		return true;
	}
	
	minionsMaxAttack(maxAttack)
	{
		var minions = this.field.getFieldCards('All');
		for (var i = 0; i < minions.length; i++)
		{
			if (minions[i].getAttack > maxAttack)
				return false;
		}
		return true;
	}
	
	maxAmountMinions(maxAmount)
	{
		var minions = this.field.getFieldCards('All');
		if (minions.length > maxAmount)
			return false;
		return true;
	}
	
	maxAmountMeleeMinions(maxAmount)
	{
		var minions = this.field.getMelee();
		if (minions > maxAmount)
			return false;
		return true;
	}
	
	maxAmountRangeMinions(maxAmount)
	{
		var minions = this.field.getRange();
		if (minions > maxAmount)
			return false;
		return true;
	}
	
	maxAmountPlayerMinions(maxAmount)
	{
		var minions = this.field.getFriendlyMinions();
		if (minions > maxAmount)
			return false;
		return true;
	}
	
	maxAmountPlayerMeleeMinions(maxAmount)
	{
		var minions = this.field.getFriendlyMelee();
		if (minions > maxAmount)
			return false;
		return true;
	}
	
	maxAmountPlayerRangeMinions(maxAmount)
	{
		var minions = this.field.getFriendlyRange();
		if (minions > maxAmount)
			return false;
		return true;
	}
	
	maxAmountEnemyMinions(maxAmount)
	{
		var minions = this.field.getEnemyMinions();
		if (minions > maxAmount)
			return false;
		return true;
	}
	
	maxAmountEnemyMeleeMinions(maxAmount)
	{
		var minions = this.field.getEnemyMelee();
		if (minions > maxAmount)
			return false;
		return true;
	}
	
	maxAmountEnemyRangeMinions(maxAmount)
	{
		var minions = this.field.getEnemyRange();
		if (minions > maxAmount)
			return false;
		return true;
	}
	
	
	// I DONT SAVE DIED MINIONS YET
	maxAmountMinonsDied(maxAmount)
	{
		return true;
	}
	
	// NOT SAVED YET
	maxAmountEnemyMinionsDied(maxAmount)
	{
		return true;
	}
	
	// NOT SAVED YET
	maxAmountPlayerMinionsDied(maxAmount)
	{
		return true;
	}

	// NOT SAVED YET
	maxAmountMinionsDiedTurn(maxAmount)
	{
		return true;
	}
	
	// NOT SAVED YET
	maxAmountEnemyMinionsDiedTurn(maxAmount)
	{
		return true;
	}
	
	// NOT SAVED YET
	maxAmountPlayerMinionsDiedTurn(maxAmount)
	{
		return true;
	}
	
	minAmountMinions(minAmount)
	{
		var minions = this.field.getFieldCards('All');
		if (minions.length < minAmount)
			return false;
		return true;
	}
	
	minAmountMeleeMinions(minAmount)
	{
		var minions = this.field.getMelee();
		
		if (minions < minAmount)
			return false;
		return true;
	}
	
	minAmountRangeMinions(minAmount)
	{
		var minions = this.field.getRange();
		if (minions < minAmount)
			return false;
		return true;
	}
	
	minAmountPlayerMinions(minAmount)
	{
		var minions = this.field.getFriendlyMinions();
		if (minions < minAmount)
			return false;
		return true;
	}
	
	minAmountPlayerMeleeMinions(minAmount)
	{
		var minions = this.field.getFriendlyMelee();
		if (minions < minAmount)
			return false;
		return true;
	}
	
	minAmountPlayerRangeMinions(minAmount)
	{
		var minions = this.field.getFriendlyRange();
		if (minions < minAmount)
			return false;
		return true;
	}
	
	minAmountEnemyMinions(minAmount)
	{
		var minions = this.field.getEnemyMinions();
		if (minions < minAmount)
			return false;
		return true;
	}
	
	minAmountEnemyMeleeMinions(minAmount)
	{
		var minions = this.field.getEnemyMelee();
		if (minions < minAmount)
			return false;
		return true;
	}
	
	minAmountEnemyRangeMinions(minAmount)
	{
		var minions = this.field.getEnemyRange();
		if (minions < minAmount)
			return false;
		return true;
	}
	
	// NOT SAVED YET
	minAmountMinonsDied(minAmount)
	{
		return true;
	}
	
	// NOT SAVED YET
	minAmountEnemyMinionsDied(minAmount)
	{
		return true;
	}
	
	// NOT SAVED YET
	minAmountPlayerMinionsDied(minAmount)
	{
		return true;
	}

	// NOT SAVED YET
	minAmountMinionsDiedTurn(minAmount)
	{
		return true;
	}
	
	// NOT SAVED YET
	minAmountEnemyMinionsDiedTurn(minAmount)
	{
		return true;
	}
	
	// NOT SAVED YET
	minAmountPlayerMinionsDiedTurn(minAmount)
	{
		return true;
	}
	
	handMaxAmount(maxAmount)
	{
		var hand = this.field.getHand();
		var enemy_hand = this.field.getEnemyHand();
		if ((hand.length + enemy_hand.length) > maxAmount)
			return false;
		return true;
	}
	
	playerHandMaxAmount(maxAmount)
	{
		var hand = this.field.getHand();
		if (hand.length > maxAmount)
			return false;
		return true;
	}
	
	enemyHandMaxAmount(maxAmount)
	{
		var hand = this.field.getEnemyHand();
		if (hand.length > maxAmount)
			return false;
		return true;
	}
	
	handMinAmount(minAmount)
	{
		var hand = this.field.getHand();
		var enemy_hand = this.field.getEnemyHand();
		if ((hand.length + enemy_hand.length) < minAmount)
			return false;
		return true;
	}
	
	playerHandMinAmount(minAmount)
	{
		var hand = this.field.getHand();
		if (hand.length < minAmount)
			return false;
		return true;
	}
	
	enemyHandMinAmount(minAmount)
	{
		var hand = this.field.getEnemyHand();
		if (hand.length < minAmount)
			return false;
		return true;
	}
	
	enemyMoreCards()
	{
		var hand = this.field.getHand();
		var enemy_hand = this.field.getEnemyHand();
		if (enemy_hand.length < hand.length)
			return false;
		return true;
		
	}
	
	playerMoreCards()
	{
		var hand = this.field.getHand();
		var enemy_hand = this.field.getEnemyHand();
		if (enemy_hand.length > hand.length)
			return false;
		return true;
		
	}
}

module.exports = Conditions;