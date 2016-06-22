/**
 * card game
 * client: https://github.com/cravay/card-game
 * server: https://github.com/ceoy/Nodejs
 */

"use strict";

var canvas;
var queue;
var stage;
var borderImages = [];
var cardBack;
var rows = {};
var socket;
var cardTypesByName = {};
var changeTurnButton;
var playerDeck;
var enemyDeck;
var spectating;

document.addEventListener("DOMContentLoaded", function() {
		showInfo("Connecting to the server ...");
		socket = io();

		socket.on("connect", function() {
			showInfo("Loading ...");
		});

		socket.on("system", function(data) {
			showInfo(data);

			// 5/7 code quality
			if(data === "Your Opponent disconnected. ¯\\_(ツ)_/¯ Please Reload to start a new Game") {
				changeTurnButton.container.getChildByName("enemy_turn").visible = true;
				changeTurnButton.container.getChildByName("player_turn").visible = false;
				changeTurnButton.container.removeAllEventListeners();
				removeAllActionOptions();
			}
		});

		socket.on("reconnect_attempt", function(data) {
			showInfo("Failed to connect, trying again ...");
		});

		socket.on("cards", function(cards) {
			for(var card of cards) {
				cardTypesByName[card.name] = card;
				card.imageName = card.name.toLocaleLowerCase() + ".png"

				if(card.health === 0) {
					card.type = "spell";
					delete card.health;
					delete card.attack;
				} else {
					card.type = "minion";
				}
			}
			prepare();
		});
});

function prepare() {
	canvas = document.getElementById("stage");
	stage = new createjs.Stage("stage");
	stage.enableMouseOver();

	var basePath = "images/";
	queue = new createjs.LoadQueue(true, basePath);

	createjs.Ticker.timingMode = createjs.Ticker.RAF;
	createjs.Ticker.addEventListener("tick", function() {
		stage.update();
	});

	for(var key in cardTypesByName) {
		queue.loadFile(cardTypesByName[key].imageName);
	}

	var names = ["btn_enemyturn", "btn_myturn", "schwert", "pfeil", 
		"overlay", "kleines_overlay", "overlay_spell",
		"kleines_overlay_spell", "held_platzhalter", 
		"totenkopf", "btn_victory", "btn_defeat"];

	for(var name of names) {
		queue.loadFile(name + ".png");
	}

	queue.on("complete", function(event) {
		prepareCardImages(function() {
			prepareCardback();
			prepareBorderImages();
			prepareFields();

			hideInfo();

			socket.on("command", function(data) {
				recieveCommand(data);
			});

			socket.on("field", function(data) {
				load(data);
			});

			if(document.location.search.match(/^\?spectate=(.+)$/)) {
				spectating = true;
				socket.emit("spectate", {
					id: document.location.search.match(/^\?spectate=(.+)$/)[1],
					name: localStorage.getItem("name")
				});
			} else {
				spectating = false;
				socket.emit("start", {
					deck: JSON.parse(localStorage.getItem("deck")),
					name: localStorage.getItem("name")
				});
			}
		});
	});
}

function prepareFields() {
	// Box on the left
	var shape = new createjs.Shape();
	shape.graphics.beginFill("#7A4E36").drawRect(0, 0, 
		largeCardDimensions.width + containerBorder.left + containerBorder.right, 480);
	stage.addChild(shape);

	for(var i = 0; i < rowNames.length; i ++) {
		rows[rowNames[i]] = [];
	}

	// Fields on the Board and Rows
	for(var i = 0; i < 4;  i ++) {
		rows.Row[i] = new Field(boardCenterX - (width * smallCardDimensions.width + (width - 1) * 
			gap) / 2, 240 - (4 * 70 + 3 * gap) / 2 + i * (70 + gap), 274, 70);

		for(var ii = 0; ii < width; ii ++) {
			var x = boardCenterX - ((width * 50 + (width - 1) * gap) / 2) + ii * (50 + gap);
			var y = 240 - (4 * 70 + 3 * gap) / 2 + i * (70 + gap);

			rows[rowNames[i + 1]][ii] = new BoardField(x, y);
		}
	}

	// Enemy Rows
	rows.Row[4] = new Field(rows.Row[0].x, rows.Row[0].y, twoRowsDimensions.width, twoRowsDimensions.height);

	// Player Rows
	rows.Row[5] = new Field(rows.Row[2].x, rows.Row[2].y, twoRowsDimensions.width, twoRowsDimensions.height);
		

	// Players
	var playerLeftBorder = containerBorder.left + largeCardDimensions.width / 2 - playerDimensions.width / 2;
	rows.Players[0] = new PlayerField(playerLeftBorder, 5);
	rows.Players[1] = new PlayerField(playerLeftBorder, 480 - playerDimensions.height - 5);	

	if(localStorage.getItem("name")) {
		rows.Players[1].name = localStorage.getItem("name");
	}

	// Change Turn
	changeTurnButton = new Field(rows.EnemyRange[4].x + smallCardDimensions.width + (640 - 
		(rows.EnemyRange[4].x + smallCardDimensions.width)) / 2 - 
		endTurnButtonDimensions.width / 2,
		(480 - endTurnButtonDimensions.height) / 2, endTurnButtonDimensions.width,
		endTurnButtonDimensions.height);

	var enemyTurn = new createjs.Bitmap(queue.getResult("btn_enemyturn.png"));
	enemyTurn.name = "enemy_turn";
	enemyTurn.set({scaleX: 0.7, scaleY: 0.7});

	var myTurn = new createjs.Bitmap(queue.getResult("btn_myturn.png"));
	myTurn.name = "player_turn";
	myTurn.visible = false;
	myTurn.set({scaleX: 0.7, scaleY: 0.7});

	changeTurnButton.container.addChild(enemyTurn);
	changeTurnButton.container.addChild(myTurn);

	// Enemy Deck
	enemyDeck = new createjs.Container();
	var enemyDeckCardBack= new createjs.Bitmap(cardBack);
	enemyDeck.addChild(enemyDeckCardBack);
	enemyDeck.x = rows.EnemyRange[4].x + smallCardDimensions.width + (640 - 
		(rows.EnemyRange[4].x + smallCardDimensions.width)) / 2 - 
		smallCardDimensions.width / 2;
	enemyDeck.y = rows.EnemyRange[0].y + (smallCardDimensions.height + gap) / 2; 
	var enemyCardsLeft = new createjs.Text(30, "bold 20px monospace", "black");
	enemyCardsLeft.set({
		name: "amount",
		x: smallCardDimensions.width / 2,
		y: smallCardDimensions.height / 2,
		textAlign: "center",
		textBaseline: "middle"
	});
	enemyDeck.addChild(enemyCardsLeft);
	stage.addChild(enemyDeck);

	// Player Deck
	playerDeck = new createjs.Container();
	var playerDeckCardBack= new createjs.Bitmap(cardBack);
	playerDeck.addChild(playerDeckCardBack);
	playerDeck.x = enemyDeck.x;
	playerDeck.y = rows.PlayerMelee[0].y + (smallCardDimensions.height + gap) / 2; 
	var playerCardsLeft = new createjs.Text(30, "bold 20px monospace", "black");
	playerCardsLeft.set({
		name: "amount",
		x: smallCardDimensions.width / 2,
		y: smallCardDimensions.height / 2,
		textAlign: "center",
		textBaseline: "middle"
	});
	playerDeck.addChild(playerCardsLeft);
	stage.addChild(playerDeck);
}

function prepareCardback() {
	// TODO: load image
	var shape = new createjs.Shape();
	shape.graphics.beginFill("#FF9800").drawRect(0, 0, 50, 70);
	shape.cache(0, 0, 50, 70, 1);

	cardBack = shape.getCacheDataURL();
}

function prepareCardImages(callback) {
	var largeMinionOverlay = queue.getResult("overlay.png");
	var largeMinionOverlayBitmap = new createjs.Bitmap(largeMinionOverlay);
	largeMinionOverlayBitmap.setTransform(0, 0, 0.5, 0.5);

	var largeSpellOverlay = queue.getResult("overlay_spell.png");
	var largeSpellOverlayBitmap = new createjs.Bitmap(largeSpellOverlay);
	largeSpellOverlayBitmap.setTransform(0, 0, 0.5, 0.5);

	var smallMinionOverlay = queue.getResult("kleines_overlay.png");
	var smallMinionOverlayBitmap = new createjs.Bitmap(smallMinionOverlay);

	var smallSpellOverlay = queue.getResult("kleines_overlay_spell.png");
	var smallSpellOverlayBitmap = new createjs.Bitmap(smallSpellOverlay);

	var loadedImages = 0;
	var totalImages = Object.keys(cardTypesByName).length * 2;

	for(var key in cardTypesByName) {
		var cardType = cardTypesByName[key];

		var container = new createjs.Container();
		var artworkImage = queue.getResult(cardType.imageName);
		var artworkBitmap = new createjs.Bitmap(artworkImage);
		container.addChild(artworkBitmap);

		// largeCard
		var largeCardContainer = new createjs.Container();

		container.cache(0, 0,
		 	artworkDimensions.width,
			artworkDimensions.height,
			0.5
 		);

		var largeCardImage = new Image();

		largeCardImage.addEventListener("load", (function(largeCardImage, largeCardContainer, cardType) {
			var largeCardImageBitmap = new createjs.Bitmap(largeCardImage);
			largeCardImageBitmap.set({x: 18, y: 25});

			largeCardContainer.addChild(largeCardImageBitmap);

			if(cardType.type === "spell") {
				largeCardContainer.addChild(largeSpellOverlayBitmap);
			} else {
				largeCardContainer.addChild(largeMinionOverlayBitmap);
			}

			var name = new createjs.Text(cardType.name, "bold 12px monospace", "white");
			var text = new createjs.Text(cardType.text, "10px monospace", "white");

			name.set({x: 17, y: 5, lineWidth: 107});
			text.set({x: 26, y: 203, lineHeight: 10, lineWidth: 105});

			largeCardContainer.addChild(name);
			largeCardContainer.addChild(text);

			largeCardContainer.cache(0, 0, largeCardDimensions.width, largeCardDimensions.height);
			cardType.largeCardDataURL = largeCardContainer.getCacheDataURL();

			loadedImages ++;

			if(loadedImages === totalImages) {
				callback();
			}
		}).bind(this, largeCardImage, largeCardContainer, cardType));

		largeCardImage.src = container.getCacheDataURL();

		// smallCard
		var smallCardContainer = new createjs.Container();

		container.cache(0, 0,
		 	artworkDimensions.width,
			artworkDimensions.height,
			0.2
 		);

		var smallCardImage = new Image();

		smallCardImage.addEventListener("load", (function(smallCardImage, smallCardContainer, cardType) {
			var smallCardImageBitmap = new createjs.Bitmap(smallCardImage);

			smallCardContainer.addChild(smallCardImageBitmap);

			if(cardType.type === "spell") {
				smallCardContainer.addChild(smallSpellOverlayBitmap);
			} else {
				smallCardContainer.addChild(smallMinionOverlayBitmap);
			}

			smallCardContainer.cache(0, 0, smallCardDimensions.width, smallCardDimensions.height);
			cardType.smallCardDataURL = smallCardContainer.getCacheDataURL();

			loadedImages ++;

			if(loadedImages === totalImages) {
				callback();
			}
		}).bind(this, smallCardImage, smallCardContainer, cardType));

		smallCardImage.src = container.getCacheDataURL();
	}
}

function prepareBorderImages() {
	borderSizes.forEach(function(borderSize) {
		borderImages[borderSize.width + "x" + borderSize.height] = {};
		borderColors.forEach(function(color) {
			var shape = new createjs.Shape();
			shape.graphics.beginStroke(color);
			shape.graphics.setStrokeStyle(5);

			shape.graphics.drawRect(0, 0, borderSize.width, borderSize.height);
			shape.filters = [new createjs.BlurFilter(3, 3, 2)];
			shape.cache(0, 0, borderSize.width, borderSize.height);

			borderImages[borderSize.width + "x" + borderSize.height][color] = shape.getCacheDataURL();
		});
	});
}
