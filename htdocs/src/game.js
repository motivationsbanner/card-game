/**
 * card game
 * client: https://github.com/cravay/card-game
 * server: https://github.com/ceoy/Nodejs
 */

"use strict";

var playerHand = []; // array of cards
var enemyHand = []; // array of Shapes
var previewCard = null;
var boardCenterX = largeCardDimensions.width + (640 - largeCardDimensions.width) / 2 + 4 * gap;

document.addEventListener("DOMContentLoaded", function(e) {
	prepare(function() {
		// TODO: read card dimensions here instead of hardcoding them

		if(document.location.search == "?noserver") {
			test();
		} else {
			start();
		}
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
		card.container.x += (smallCardDimensions.width + gap) / 2;
	});

	card.container.set({
		y: 480 - smallCardDimensions.height,
		x: boardCenterX - (smallCardDimensions.width + gap) / 2 * playerHand.length
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

function startPlayerTurn() {
	waitForAction();
}

function waitForAction() {
	playerHand.forEach(function(card) {
		if(card.isPlayable()) {
		card.showBorder("white");
			card.container.on("click", function() {
				removeAllActionOptions();
				card.play(function() {
					// TODO: update hand
					waitForAction();
				});
			});
		}
	});
}

function removeAllActionOptions() {
	playerHand.forEach(function(card) {
		card.hideBorder("white");
		card.container.removeAllEventListeners("click");
	});
}

function startEnemyTurn() {
	// TODO
}

function setPreviewCard(card) {
	if(previewCard) {
		stage.removeChild(previewCard.cardType.largeBitmap);
	}

	stage.addChild(card.cardType.largeBitmap);
	previewCard = card;
}
