/**
 * card game
 * client: https://github.com/cravay/card-game
 * server: https://github.com/ceoy/Nodejs
 */

"use strict";

var rows = {
		EnemyHand : 0,
		EnemyRange: 1,
		EnemyMelee: 2,
		PlayerMelee: 3,
		PlayerRange: 4,
		PlayerHand: 5
	};


var playerHand = []; // array of cards
var enemyHand = []; // array of Shapes
var previewCard = null;
var boardCenterX = largeCardDimensions.width + (640 - largeCardDimensions.width) / 2 + 4 * gap;

document.addEventListener("DOMContentLoaded", function(e) {
	prepare(function() {
		// TODO: read card dimensions here instead of hardcoding them

		start();
	});
});

function playerDrawCards(cards)
{
	cards.forEach(function(card) {
		playerDrawCard(card);
	});
}

function playerDrawCard(id) {
	var cardType = cardTypes[id];

	var card = cardFactory(cardType);

	playerHand.push(card);

	playerHand.forEach(function(card) {
		card.container.x -= (smallCardDimensions.width + gap) / 2;
	});

	card.container.set({
		y: 480 - smallCardDimensions.height,
		x: boardCenterX + (playerHand.length - 2) * (smallCardDimensions.width / 2)
			+ (playerHand.length - 1) * (gap / 2) 
	});
}

function enemyDrawCards(amount) {
	for(var i = 0; i < amount; i ++) {
		enemyDrawCard();
	}
}

function enemyDrawCard() {
	var card = new createjs.Bitmap(cardBack);
	enemyHand.push(card);
	stage.addChild(card);

	enemyHand.forEach(function(card) {
		card.x += (smallCardDimensions.width + gap) / 2;
	});

	card.set({
		y: 0,
		x: boardCenterX - (smallCardDimensions.width + gap) / 2 * enemyHand.length
	});
}

function waitForAction() {
	playerHand.forEach(function(card) {
		if(card.isPlayable()) {
		card.showBorder("white");
			card.container.on("click", function() {
				card.play(function() {
					// TODO: update hand
					waitForAction();
				});
			});
		}
	});
}

function setPlayOptions(positions) {
	for(var i = 0; i < positions.length; i ++) {
		if(positions[i].row == "PlayerHand") {
			var card = playerHand[positions[i].index];
			card.showBorder("white");

			card.container.on("click", (function(i) {
				removeAllActionOptions();
				
				window.sendCommand({
					command: "select_option",
					pos: {row: "PlayerHand", index: i}
				});
			}).bind(this, i));
		}
	}
}

function removeAllActionOptions() {
	playerHand.forEach(function(card) {
		card.hideBorder("white");
		card.container.removeAllEventListeners("click");
	});
}

function setPreviewCard(card) {
	if(previewCard) {
		stage.removeChild(previewCard.cardType.largeBitmap);
	}

	stage.addChild(card.cardType.largeBitmap);
	previewCard = card;
}
