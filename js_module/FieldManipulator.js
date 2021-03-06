"use strict";
class FieldManipulator
{
	constructor (game)
	{
		this.game = game;
		this.field = this.game.on_turn.field;
		this.enemyField = this.game.not_turn.field;
		this.graveyard = {
			total: 0,
			on_turn: 0,
			not_turn: 0,
			turn: 0
		};
	}
	
	attack(attacker, defender)
	{
		var att_pos = attacker.getPos(),		
			enemy_att_pos = this.field.translate(att_pos, this.field.getRow(att_pos.row).length - 1);
		
		if (defender.type == "Player")
		{
			var def_pos = {row: "Players", index: defender.index },
				enemy_def_pos = this.field.translate(def_pos, 2);
			
			var enemy_command = {command: "attack", attacker: enemy_att_pos, target: enemy_def_pos},
				player_command = {command: "attack", attacker: attacker.getPos(), target: def_pos};
				
			this.game.on_turn.sendCommandMessage(player_command);
			this.game.not_turn.sendCommandMessage(enemy_command);
			
			this.dmgHero(defender, attacker.getAttack());
			return;
			
		}
		
		var def_pos = defender.getPos(),
			enemy_def_pos = this.field.translate(def_pos, this.field.getRow(def_pos.row).length -1);
		
		var enemy_command = {command: "attack", attacker: enemy_att_pos, target: enemy_def_pos},
			player_command = {command: "attack", attacker: attacker.getPos(), target: def_pos};
			
		this.game.on_turn.sendCommandMessage(player_command);
		this.game.not_turn.sendCommandMessage(enemy_command);
		
		var def_att = defender.getAttack();
		
		this.doDmg(defender, attacker.getAttack());
		
		if (attacker.type == "Melee") // Recoil
			this.doDmg(attacker, def_att);
			
		if (attacker.type == 'Range' && defender.type == 'Range')
			this.doDmg(attacker, defender.getAttack());
	}
	
	doDmg(target, damage)
	{
		var new_health = target.getHealth() - damage;
		var target_pos = target.getPos(),
			enemy_pos = this.field.translate(target_pos, this.field.getRow(target_pos.row).length -1);
		
		var player_command = {command: "set_health", target: target_pos , health: new_health};
		var enemy_command = {command: "set_health", target: enemy_pos, health: new_health};
		
		this.game.on_turn.sendCommandMessage(player_command);
		this.game.not_turn.sendCommandMessage(enemy_command);
		
		target.setHealth(new_health);
		
		var new_pos = this.field.translate(target.getPos(), this.field.getRow(target.getPos().row).length - 1);
		var card = this.enemyField.getCardOnPos(new_pos);
		card.setHealth(new_health);
		
		
		if (new_health <= 0)
		{
			this.kill(target);
		}
	}
	
	dmgHero(tar, damage)
	{
		var new_health = this.game.not_turn.hp - damage;
		if (tar.index == 0) // Enemy
		{
			var new_health = this.game.not_turn.hp - damage;
			this.game.not_turn.setHealth(new_health);
		} 
		if (tar.index == 1) // Player
		{
			var new_health = this.game.on_turn.hp - damage;
			this.game.not_turn.setHealth(new_health);
		}
		
		var enemy_pos = this.field.translate(tar, 1);
		
		var enemy_command = {command: "set_health", target: enemy_pos, health: new_health};
		var player_command = {command: "set_health", target: tar, health: new_health};
		
		this.game.on_turn.sendCommandMessage(player_command);
		this.game.not_turn.sendCommandMessage(enemy_command);
		
		if (new_health <= 0)
		{
			this.endGame(tar);
		}
	}
	
	endGame(deadPlayer)
	{
		var won = {command: "end_game", winner: true},
			lost = {command: "end_game", winner: false};
			
		if (deadPlayer.index == 0) // Enemy Lost
		{
			this.game.on_turn.sendCommandMessage(won);
			this.game.not_turn.sendCommandMessage(lost);
		} else if (deadPlayer.index == 1) // Player Lost
		{
			this.game.on_turn.sendCommandMessage(lost);
			this.game.not_turn.sendCommandMessage(won);
		}
		this.game.end();
	}
	
	kill(target)
	{
		var target_pos = target.getPos(),
			enemy_pos = this.field.translate(target_pos, this.field.getRow(target_pos.row).length -1);
		
		this.field.removeCard(target_pos);
		this.enemyField.removeCard(enemy_pos);

		var player_command = {command: "kill", target: target_pos};
		var enemy_command = {command: "kill", target: enemy_pos};
		
		this.game.on_turn.sendCommandMessage(player_command);
		this.game.not_turn.sendCommandMessage(enemy_command);
		
		target.onDeath(this);
		this.graveyard.total++;
		if (target_pos.row == 'EnemyMelee' || target_pos.row == 'EnemyRange')
			this.graveyard.not_turn++;
		else
			this.graveyard.on_turn++;
		this.graveyard.turn++;
	}
	
	buffHP(targetRow, amount, glow)
	{
		glow = glow || false;
		if (targetRow.row == 'Row')
		{
			var cards = this.field.getCardsInRow(targetRow.index);
			for (var i = 0; i < cards.length; i++)
			{
				var new_health = amount + cards[i].getHealth();
				cards[i].setHealth(new_health);
				
				var tar_pos = cards[i].getPos(),
					enemy_pos = this.field.translate(tar_pos, this.field.getRow(tar_pos.row).length - 1);
				
				var enemy_card = this.enemyField.getCardOnPos(enemy_pos);
				enemy_card.setHealth(new_health);
				
				var enemy_command = {command: "set_health", target: enemy_pos, health: new_health};
				var player_command = {command: "set_health", target: tar_pos, health: new_health};
		
				this.game.on_turn.sendCommandMessage(player_command);
				this.game.not_turn.sendCommandMessage(enemy_command);
			}
			
			
			if (!glow)
			{
				var enemyGlow = {command: "glow", target: this.field.translate(targetRow, 3), color: "blue"};
				var playerGlow = {command: "glow", target: targetRow, color: "blue"};
		
				this.game.on_turn.sendCommandMessage(playerGlow);
				this.game.not_turn.sendCommandMessage(enemyGlow);
			}
				
		} else {
			var card = this.field.getCardOnPos(targetRow);
			
			var new_health = card.getHealth() + amount;
			
			var tar_pos = card.getPos(),
				enemy_pos = this.field.translate(tar_pos, this.field.getRow(tar_pos.row).length - 1);
				
			var enemyCard = this.enemyField.getCardOnPos(enemy_pos);
			
			card.setHealth(new_health);
			enemyCard.setHealth(new_health);
			
			var enemy_command = {command: "set_health", target: enemy_pos, health: new_health};
			var player_command = {command: "set_health", target: tar_pos, health: new_health};
		
			this.game.on_turn.sendCommandMessage(player_command);
			this.game.not_turn.sendCommandMessage(enemy_command);	
			
			if (!glow)
			{
				var enemyGlow = {command: "glow", target: enemy_pos, color: "blue"};
				var playerGlow = {command: "glow", target: targetRow, color: "blue"};
		
				this.game.on_turn.sendCommandMessage(playerGlow);
				this.game.not_turn.sendCommandMessage(enemyGlow);
			}
		}
		
	}

	buffAttack(targetRow, amount, glow)
	{	
		glow = glow || false;
		if (targetRow.row == 'Row')
		{
			var cards = this.field.getCardsInRow(targetRow.index);
			for (var i = 0; i < cards.length; i++)
			{
				var new_attack = amount + cards[i].getAttack();
				cards[i].setAttack(new_attack);
				
				var tar_pos = cards[i].getPos(),
					enemy_pos = this.field.translate(tar_pos, this.field.getRow(tar_pos.row).length - 1);
				
				var enemy_card = this.enemyField.getCardOnPos(enemy_pos);
				enemy_card.setAttack(new_attack);
				
				var enemy_command = {command: "set_attack", target: enemy_pos, attack: new_attack};
				var player_command = {command: "set_attack", target: tar_pos, attack: new_attack};
		
				this.game.on_turn.sendCommandMessage(player_command);
				this.game.not_turn.sendCommandMessage(enemy_command);
			}
			
			if (!glow)
			{
				var enemyGlow = {command: "glow", target: this.field.translate(targetRow, 3), color: "blue"};
				var playerGlow = {command: "glow", target: targetRow, color: "blue"};
				
				this.game.on_turn.sendCommandMessage(playerGlow);
				this.game.not_turn.sendCommandMessage(enemyGlow);
			}
		}  else {
			var card = this.field.getCardOnPos(targetRow);
			var new_attack = card.getAttack() + amount;
			
			var tar_pos = card.getPos(),
				enemy_pos = this.field.translate(tar_pos, this.field.getRow(tar_pos.row).length - 1);
				
			var enemyCard = this.enemyField.getCardOnPos(enemy_pos);
			
			card.setAttack(new_attack);
			enemyCard.setAttack(new_attack);
			
			var enemy_command = {command: "set_attack", target: enemy_pos, attack: new_attack};
			var player_command = {command: "set_attack", target: tar_pos, attack: new_attack};
		
			this.game.on_turn.sendCommandMessage(player_command);
			this.game.not_turn.sendCommandMessage(enemy_command);	
			
			if (!glow)
			{
				var enemyGlow = {command: "glow", target: enemy_pos, color: "blue"};
				var playerGlow = {command: "glow", target: targetRow, color: "blue"};
		
				this.game.on_turn.sendCommandMessage(playerGlow);
				this.game.not_turn.sendCommandMessage(enemyGlow);
			}
		}
	}
	
	buffAttackFriendly(amount, pos)
	{
		if (pos.row == 'PlayerRange' || pos.row == 'PlayerMelee')
		{
			this.buffAttack({row: "Row", index: 2}, amount, true);
			this.buffAttack({row: "Row", index: 3}, amount, true);
		
			var enemyGlow = {command: "glow", target: {row: "Row", index: 4}, color: "blue"};
			var playerGlow = {command: "glow", target: {row: "Row", index: 5}, color: "blue"};
		}
		
		if (pos.row == 'EnemyRange' || pos.row == 'EnemyMelee')
		{
			this.buffAttack({row: "Row", index: 0}, amount, true);
			this.buffAttack({row: "Row", index: 1}, amount, true);
			
			var enemyGlow = {command: "glow", target: {row: "Row", index: 5}, color: "blue"};
			var playerGlow = {command: "glow", target: {row: "Row", index: 4}, color: "blue"};
		}
		
		this.game.on_turn.sendCommandMessage(playerGlow);
		this.game.not_turn.sendCommandMessage(enemyGlow);
	}
	
	buffHPFriendly(amount, pos)
	{
		
		if (pos.row == 'PlayerRange' || pos.row == 'PlayerMelee')
		{		
			this.buffHP({row: "Row", index: 2}, amount, true);
			this.buffHP({row: "Row", index: 3}, amount, true);
			
			var enemyGlow = {command: "glow", target: {row: "Row", index: 4}, color: "blue"};
			var playerGlow = {command: "glow", target: {row: "Row", index: 5}, color: "blue"};
		}
		
		if (pos.row == 'EnemyRange' || pos.row == 'EnemyMelee')
		{
			this.buffHP({row: "Row", index: 0}, amount, true);
			this.buffHP({row: "Row", index: 1}, amount, true);
			
			var enemyGlow = {command: "glow", target: {row: "Row", index: 5}, color: "blue"};
			var playerGlow = {command: "glow", target: {row: "Row", index: 4}, color: "blue"};
		}
		
		this.game.on_turn.sendCommandMessage(playerGlow);
		this.game.not_turn.sendCommandMessage(enemyGlow);
	}
	
	dmgRow(targetRow, amount)
	{
		if (targetRow.row == 'Row')
		{
			var cards = this.field.getCardsInRow(targetRow.index);
			for (var i = 0; i < cards.length; i++)
			{
				this.doDmg(cards[i], amount);
			}
			
			var enemyGlow = {command: "glow", target: {row: "Row", index: this.field.translate(targetRow, 3).index}, color: "blue"};
			var playerGlow = {command: "glow", target: {row: "Row", index: targetRow.index}, color: "blue"};
			
			this.game.on_turn.sendCommandMessage(playerGlow);
			this.game.not_turn.sendCommandMessage(enemyGlow);
			
		} else {
			console.log('smt went wrong');
		}
	}
	
	dmgAll(amount)
	{
		var cards = this.field.getFieldCards("All");
		for (var i = 0; i < card.length; i++)
		{
			doDmg(cards[i], amount);
		}
	}
	
	draw(amount, player)
	{
		player = player || 1;
		amount = amount || 1;
		
		if (player ==  1)
		{
			var success = this.game.on_turn.draw(amount, this);
			
			if (success)
				this.game.not_turn.enemyDraw(amount);
			else
				this.game.not_turn.sendCommandMessage({command: "overdraw", card: amount});
			
			var enemyGlow = {command: "glow", target: {row: "Players", index: 0}, color: "blue"};
			var playerGlow = {command: "glow", target: {row: "Players", index: 1}, color: "blue"};
			
			this.game.on_turn.sendCommandMessage(playerGlow);
			this.game.not_turn.sendCommandMessage(enemyGlow);
		}
		
		if (player == 0)
		{
			var success = this.game.not_turn.draw(amount);
			
			if (success)
				this.game.on_turn.enemyDraw(amount);
			else
				this.game.on_turn.sendCommandMessage({command: "overdraw", card: amount});
			
			var playerGlow = {command: "glow", target: {row: "Players", index: 0}, color: "blue"};
			var enemyGlow = {command: "glow", target: {row: "Players", index: 1}, color: "blue"};
			
			this.game.on_turn.sendCommandMessage(playerGlow);
			this.game.not_turn.sendCommandMessage(enemyGlow);
		}	
		
	}
	
	
	changeTurn() {
		this.field = this.game.on_turn.field;
		this.enemyField = this.game.not_turn.field;
		
		var temp = this.graveyard.on_turn;
		this.graveyard.on_turn = this.graveyard.not_turn;
		this.graveyard.not_turn = temp;
		this.graveyard.turn = 0;
	}	
}

module.exports = FieldManipulator;