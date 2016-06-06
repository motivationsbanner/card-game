/**
 * card game
 * client: https://github.com/cravay/card-game
 * server: https://github.com/ceoy/Nodejs
 */

"use strict";

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

function playerDrawCard(cardName) {
	rows.PlayerHand.forEach (function(field) {
		field.x -= (smallCardDimensions.width + gap) / 2;
	});

	var cardType = cardTypesByName[cardName];
	var card = cardFactory(cardType);
	var x =  boardCenterX + (rows.PlayerHand.length - 2 + 1) * (smallCardDimensions.width / 2)
		+ (rows.PlayerHand.length - 1 + 1) * (gap / 2);
	var y = 480 - smallCardDimensions.height;

	var field = new Field(x, y, card);

	rows.PlayerHand.push(field);

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

	rows.EnemyHand.forEach (function(field) {
		field.x -= (smallCardDimensions.width + gap) / 2;
	});

	var x =  boardCenterX + (rows.EnemyHand.length - 2 + 1) * (smallCardDimensions.width / 2)
		+ (rows.EnemyHand.length - 1 + 1) * (gap / 2);
	var y = 0;
	
	var field = new Field(x, y, card);
	
	rows.EnemyHand.push(field);
	stage.addChild(card);
}

function setPlayOptions(positions, abort) {
	if(abort instanceof Object) {
		positions.push(abort);
		abort = getField(abort);
	}

	for(var i = 0; i < positions.length; i ++) {
		var field = getField(positions[i]);

		if(field === abort) {
			field.showBorder("red");
		} else {
			field.showBorder("white")
		}

		field.container.on("click", (function(row, index) {
			removeAllActionOptions();

			window.sendCommand({
				command: "select_option",
				pos: {row: row, index: index}
			});
		}).bind(this, positions[i].row, positions[i].index));
	}
}

function revealCard(field, cardName) {
	var cardType = cardTypesByName[cardName];
	var card = cardFactory(cardType);
	card.x = field.x;
	card.y = field.y;

	stage.addChild(card.container);
	stage.removeChild(field.card);
	field.card = card;
}

function playCard(from, to, cardName) {
	if(from.row !== "PlayerHand" && from.row !== "EnemyHand") {
		throw "a card can only played from a hand";
	}
	
	if(from.row === "EnemyHand") {
		revealCard(getField(from), cardName);
	}
	
	getField(from).card.goToField(getField(to), function() {
		for(var i = 0; i < from.index; i ++) {
			rows[from.row][i].x += (smallCardDimensions.width + gap) / 2;
		}
		
		for(var i = from.index + 1; i < rows[from.row].length; i ++) {
			rows[from.row][i].x -= (smallCardDimensions.width + gap) / 2;
		}
			stage.removeChild(getField(from).container);
			getField(to).card = getField(from).card;
			rows[from.row].splice(from.index, 1);
			delete getField(from);
	});
}

function removeAllActionOptions() {
	for(var name in rows) {
		for(var field of rows[name]) {
			// At least it works
			field.hideBorder("red");
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
