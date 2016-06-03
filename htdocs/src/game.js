/**
 * card game
 * client: https://github.com/cravay/card-game
 * server: https://github.com/ceoy/Nodejs
 */

"use strict";

var enemyHand = []; // array of Shapes
var previewCard = null;
var boardCenterX = largeCardDimensions.width + (640 - largeCardDimensions.width) / 2 + 4 * gap;

document.addEventListener("DOMContentLoaded", function() {
	prepare(start);
});

function playerDrawCards(cards) {
	cards.forEach(function(card) {
		playerDrawCard(card);
	});
}

function playerDrawCard(id) {
	// TODO: animate
	rows["PlayerHand"].forEach(function(field) {
		field.x -= (smallCardDimensions.width + gap) / 2;
	});

	var cardType = cardTypes[id];
	var card = cardFactory(cardType);
	var x =  boardCenterX + (rows["PlayerHand"].length - 2 + 1) * (smallCardDimensions.width / 2)
		+ (rows["PlayerHand"].length - 1 + 1) * (gap / 2);
	var y = 480 - smallCardDimensions.height;

	var field = new Field(x, y, card);

	rows["PlayerHand"].push(field);

	card.x = x;
	card.y = y;

	stage.addChild(card.container);
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

function setPlayOptions(positions) {
	for(var i = 0; i < positions.length; i ++) {
		var field = rows[positions[i].row][positions[i].index];

		field.showBorder("white");
		
		field.container.on("click", (function(row, index) {
			removeAllActionOptions();

			window.sendCommand({
				command: "select_option",
				pos: {row: row, index: index}
			});
		}).bind(this, positions[i].row, positions[i].index));
	}
}

function removeAllActionOptions() {
	for(var name in rows) {
		for(var field of rows[name]) {
			field.hideBorder("white");
			field.container.removeAllEventListeners("click");
		}
	}
}

function setPreviewCard(card) {
	if(previewCard) {
		stage.removeChild(previewCard.cardType.largeBitmap);
	}

	stage.addChild(card.cardType.largeBitmap);
	previewCard = card;
}
