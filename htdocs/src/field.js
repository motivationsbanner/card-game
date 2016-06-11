/**
 * card game
 * client: https://github.com/cravay/card-game
 * server: https://github.com/ceoy/Nodejs
 */

"use strict";
 
class Field {
	constructor(x, y, width, height) {
		this.container = new createjs.Container();

		this.width = width;
		this.height = height;

		var hit = new createjs.Shape();
		hit.graphics.beginFill("#000").drawRect(0, 0, this.width, this.height);
		this.container.hitArea = hit;

		// example: {red: createjs.Bitmap, white: createjs.Bitmap}
		this.borders = {};

		this.x = x;
		this.y = y;

		stage.addChild(this.container);
	}
	
	set x(x) {
		this.container.x = x;
	}
	
	set y(y) {
		this.container.y = y;
	}
	
	get x() {
		return this.container.x;
	}
	
	get y() {
		return this.container.y;
	}

	hideBorder(color) {
		if(this.borders[color]) {
			this.borders[color].set({"visible": false});
		}
	}

	showBorder(color) {
		if(!this.borders[color]) {
			this.borders[color] = new createjs.Bitmap(borderImages[color]);
			this.borders[color].set({x: -6, y: -6});
			this.container.addChild(this.borders[color]);
		} else {
			this.borders[color].set({x: -6, y: -6});
		}
		
		stage.setChildIndex(this.container, stage.numChildren - 1);
		this.borders[color].visible = true;
	}

	glow(color) {
		var rect = new createjs.Shape();
		rect.graphics.beginFill(color)
			.drawRect(0, 0, this.width, this.height);

		this.container.addChild(rect);
		stage.setChildIndex(this.container, stage.numChildren - 1);

		rect.alpha = 0;

		createjs.Tween.get(rect).to({alpha: 0.5}, 500)
			.to({alpha: 0}, 500)
			.call(function() {
				this.container.removeChild(rect);
			}, [], this);
	}
}

class CardField extends Field {
	constructor(x, y, cardName) {
		super(x, y, smallCardDimensions.width, smallCardDimensions.height);

		if(cardName) {
			this.setCard(cardName);
		} else {
			this.card = new createjs.Bitmap(cardBack);
			this.container.addChild(this.card);
		}
	}

	goToField(field, callback) {
		callback = callback || function(){};
		
		stage.setChildIndex(this.container, stage.numChildren - 1);
		
		createjs.Tween.get(this)
			.to({
				x: field.x,
				y: field.y
			}, 500)
			.call(callback);
	}

	setCard(cardName) {
		var cardType = cardTypesByName[cardName];
		var card = cardFactory(cardType);

		if(this.card) {
			if(this.card instanceof Card) {
				this.container.removeChild(this.card.smallCard);
			} else {
				this.container.removeChild(this.card);
			}
		}

		this.card = card;

		this.container.addChild(this.card.smallCard);
		this.container.setChildIndex(this.card.smallCard, 0);

		this.container.on("mouseover", function() {
			setPreviewCard(this.card);
		}, this);
	}
}

class BoardField extends Field {
	constructor(x, y) {
		super(x, y, smallCardDimensions.width, smallCardDimensions.height);

		var shape = new createjs.Shape();
		shape.graphics.beginFill("#C27E5C").drawRect(0, 0, this.width, this.height);
		shape.set({x: x, y: y});

		stage.addChild(shape);
	}
}

function getField(data) {
	return rows[data.row][data.index];
}
