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

document.addEventListener("DOMContentLoaded", function() {
		showInfo("Connecting to the server ...");
		socket = io();

		socket.on("connect", function() {
			showInfo("Loading ...");
		});

		socket.on("system", function(data) {
			showInfo(data);
		});

		socket.on("reconnect_attempt", function(data) {
			showInfo("Failed to connect, trying again ...");
		});

		socket.on("cards", function(cards) {
			for(var card of cards) {
				cardTypesByName[card.name] = card;
				card.imageName = card.name.toLocaleLowerCase() + ".png"

				// TODO: change
				if(card.health === 0) {
					card.type = "spell";
					delete card.health;
					delete card.attack;
				} else {
					card.type = "minion";
				}
			}

			prepare(start);
		});
});

function prepare(callback) {
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

	queue.loadFile("schwert.png");
	queue.loadFile("overlay.png");
	queue.loadFile("kleines_overlay.png");
	queue.loadFile("overlay_spell.png");
	queue.loadFile("kleines_overlay_spell.png");
	queue.loadFile("held_platzhalter.png");

	queue.on("complete", function(event) {
		prepareCardImages();
		prepareBorderImages();
		prepareFields();
		prepareCardback();
		hideInfo();
		callback();
	});
}

function prepareFields() {
	// Box on the left
	var shape = new createjs.Shape();
	shape.graphics.beginFill("#7A4E36").drawRect(0, 0, 
		largeCardDimensions.width + containerBorder.left + containerBorder.right, 480);
	stage.addChild(shape);

	// Fields on the Board	
	for(var i = 0; i < rowNames.length; i ++) {
		rows[rowNames[i]] = [];
	}

	for(var i = 0; i < 4;  i ++) {
		for(var ii = 0; ii < width; ii ++) {
			var x = boardCenterX - ((width * 50 + (width - 1) * gap) / 2) + ii * (50 + gap);
			var y = 240 - (4 * 70 + 3 * gap) / 2 + i * (70 + gap);

			rows[rowNames[i + 1]][ii] = new BoardField(x, y, null);
		}
	}

	// Player and enemy
	var player = new createjs.Bitmap(queue.getResult("held_platzhalter.png"))
	player.setTransform(0, 0, 0.7, 0.7);
	stage.addChild(player);
}

function prepareCardback() {
	var shape = new createjs.Shape();
	shape.graphics.beginFill("#FF9800").drawRect(0, 0, 50, 70);
	shape.cache(0, 0, 50, 70, 1);

	cardBack = shape.getCacheDataURL();
}

function prepareCardImages() {
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
			1
 		);

		var largeCardImageBitmap = new createjs.Bitmap(container.getCacheDataURL());
		largeCardImageBitmap.setTransform(18, 25, 0.5, 0.5);

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

		largeCardContainer.cache(0, 0, largeCardContainer.getBounds().width, 
			largeCardContainer.getBounds().height, 1);
		cardType.largeCardDataURL = largeCardContainer.getCacheDataURL();

		// smallCard
		var smallCardContainer = new createjs.Container();

		container.cache(0, 0,
		 	artworkDimensions.width,
			artworkDimensions.height,
			0.2
 		);

		var smallCardImageBitmap = new createjs.Bitmap(container.getCacheDataURL());

		smallCardContainer.addChild(smallCardImageBitmap);

		if(cardType.type === "spell") {
			smallCardContainer.addChild(smallSpellOverlayBitmap);
		} else {
			smallCardContainer.addChild(smallMinionOverlayBitmap);
		}
		smallCardContainer.cache(0, 0, smallCardDimensions.width, smallCardDimensions.height);
		cardType.smallCardDataURL = smallCardContainer.getCacheDataURL();
	}
}

// TODO: fix
// TODO: different sizes
function prepareBorderImages()
{
	var bounds = {x:0, y: 0, width: 50, height: 70};

	var colors = ["white", "red", "green", "blue"];

	colors.forEach(function(color) {
		var shape = new createjs.Shape();
		shape.graphics.beginStroke(color);
		shape.graphics.setStrokeStyle(6);

		shape.graphics.drawRect(0, 0, bounds.width, bounds.height);
		shape.filters = [new createjs.BlurFilter(4, 4, 2)];
		shape.cache(0, 0, 50, 70);

		borderImages[color] = shape.getCacheDataURL();
	});
}
