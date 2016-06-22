/**
 * card game
 * client: https://github.com/cravay/card-game
 * server: https://github.com/ceoy/Nodejs
 */

"use strict";

function load(data) {
	// Players
	rows.Players[0].health = data.EnemyHero.health;
	rows.Players[0].name = data.EnemyHero.name;

	rows.Players[1].health = data.PlayerHero.health;
	rows.Players[1].name = data.PlayerHero.name;

	enemyDeck.getChildByName("amount").text = data.PlayerDeck;
	playerDeck.getChildByName("amount").text = data.EnemyDeck;

	// Hands
	var minEnemyX = boardCenterX - data.EnemyHand * smallCardDimensions.width * 0.5 -
		(data.EnemyHand - 1) * gap;

	for(var i = 0; i < data.EnemyHand; i ++) {
		var card = new CardField(minEnemyX + i * (smallCardDimensions.width + gap), 0);
		rows.EnemyHand.push(card);
	}

	var minPlayerX = boardCenterX - data.PlayerHand.length * smallCardDimensions.width * 0.5 -
		(data.PlayerHand.length - 1) * gap;

	for(var i = 0; i < data.PlayerHand.length; i ++) {
		var card = new CardField(minPlayerX + i * (smallCardDimensions.width + gap),
			480 - smallCardDimensions.height, data.PlayerHand[i].name);
			rows.PlayerHand.push(card);
	}

	// Fields
	for(var i = 1; i < 5; i ++) {
		var row = rows[rowNames[i]];

		for(var ii = 0; ii < 5; ii ++) {
			if(data[rowNames[i]][ii]) {
				var card = new CardField(row[ii].x, row[ii].y, data[rowNames[i]][ii].name);
				card.attack = data[rowNames[i]][ii].attack;
				card.health = data[rowNames[i]][ii].health;
				card.backup = row[ii];

				row[ii] = card;
			}
		}
	}
}
