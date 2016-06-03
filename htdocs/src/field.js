/**
 * card game
 * client: https://github.com/cravay/card-game
 * server: https://github.com/ceoy/Nodejs
 */

"use strict";
 
 class Field {
	constructor(x, y, card) {
		this.container = new createjs.Container();

		var hit = new createjs.Shape();
		hit.graphics.beginFill("#000").drawRect(0, 0, smallCardDimensions.width, smallCardDimensions.height);
		this.container.hitArea = hit;

		this.card = card || null;

		// example: {red: createjs.Bitmap, white: createjs.Bitmap}
		this.borders = {};

		this.x = x;
		this.y = y;

		stage.addChild(this.container);
	}

	setPosition(x, y) {
		this.container.set({x: x, y: y});

		if(this.card) {
			this.card.container.set({x: x, y: y});
		}
	}
	
	set x(x) {
		this.container.x = x;
		if(this.card) {
			this.card.container.x = x;
		}
	}
	
	set y(y) {
		this.container.y = y;
		if(this.card) {
			this.card.container.y = y;
		}
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
			this.borders[color].set({x: -6,y: -6});
			this.container.addChild(this.borders[color]);
		} else {
			this.borders[color].set({x: -6,y: -6});
		}
		
		stage.setChildIndex(this.container, stage.numChildren - 1);
		this.borders[color].visible = true;
	}
}

class BoardField extends Field {
	constructor(x, y, card) {
		super(x, y, card);

		var shape = new createjs.Shape();
		shape.graphics.beginFill("#C27E5C").drawRect(0, 0, 50, 70);
		shape.set({x: x, y: y});

		stage.addChild(shape);
	}
}

function getField(data) {
	return rows[data.row][data.index];
}