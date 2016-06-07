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

function prepare(callback) {
	var basePath = "images/";

	canvas = document.getElementById("stage");

	showInfo("Loading ...");

	stage = new createjs.Stage("stage");

	queue = new createjs.LoadQueue(true, basePath);

	stage.enableMouseOver();

	createjs.Ticker.timingMode = createjs.Ticker.RAF;
	createjs.Ticker.addEventListener("tick", onTick);

	queue.on("complete", function(event) {
		prepareCardImages();
		prepareBorderImages();
		prepareFields();
		prepareCardback();
		hideInfo();
		callback();
	});

	cardTypes.forEach(function(cardType) {
		queue.loadFile(cardType.imageName);
	});

	queue.loadFile("karte.png");
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
	// TODO: update to use cardNames
	for(var i = 0; i < cardTypes.length; i ++) {
		var container = new createjs.Container();
		var artworkImage = queue.getResult(cardTypes[i].imageName);
		var artworkBitmap = new createjs.Bitmap(artworkImage);
		var cardBorderImage = queue.getResult("karte.png");
		var cardBorderBitmap = new createjs.Bitmap(cardBorderImage);
		var name = new createjs.Text(cardTypes[i].name, "bold 15px monospace", "black");
		var text = new createjs.Text(cardTypes[i].text, "15px monospace", "black");

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

		cardTypes[i].dataURL = container.getCacheDataURL();
	}
}

// TODO: fix
function prepareBorderImages()
{
	var bounds = {x:0, y: 0, width: 50, height: 70};

	var colors = ["white", "red", "green"];

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
