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
	createjs.Ticker.addEventListener("tick", onTick);

	for(var key in cardTypesByName) {
		queue.loadFile(cardTypesByName[key].imageName);
	}

	queue.loadFile("karte.png");
	queue.loadFile("schwert.png");

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
		largeCardDimensions.width + 4 * gap, 480);
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
}

function prepareCardback() {
	var shape = new createjs.Shape();
	shape.graphics.beginFill("#FF9800").drawRect(0, 0, 50, 70);
	shape.cache(0, 0, 50, 70, 1);

	cardBack = shape.getCacheDataURL();
}

function prepareCardImages() {
	var cardBorderImage = queue.getResult("karte.png");
	var cardBorderBitmap = new createjs.Bitmap(cardBorderImage);

	for(var key in cardTypesByName) {
		var cardType = cardTypesByName[key];

		var container = new createjs.Container();
		var artworkImage = queue.getResult(cardType.imageName);
		var artworkBitmap = new createjs.Bitmap(artworkImage);

		var name = new createjs.Text(cardType.name, "bold 15px monospace", "black");
		var text = new createjs.Text(cardType.text, "15px monospace", "black");

		name.set({x: 22, y: 215, lineHeight: 18, lineWidth: 214});
		text.set({x: 22, y: 240, lineHeight: 18, lineWidth: 214});

		container.addChild(artworkBitmap);
		container.addChild(cardBorderBitmap);
		container.addChild(text);
		container.addChild(name);

		container.cache(0, 0,
		 	originalCardDimensions.width,
			originalCardDimensions.height,
			1
 		);

		cardType.dataURL = container.getCacheDataURL();
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

function onTick()
{
	stage.update();
}
