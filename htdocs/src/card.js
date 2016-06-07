/**
 * card game
 * client: https://github.com/cravay/card-game
 * server: https://github.com/ceoy/Nodejs
 */

"use strict";

class Card {
	constructor(cardType) {
		this.cardType = cardType;
		
		this.smallCard = new createjs.Bitmap();
		this.largeCard = new createjs.Container();

		this.largeCard.setTransform(
			2 * gap, 
			(480 - largeCardDimensions.height) / 2, 
			0.5, 
			0.5
		);

		var largeCardBitmap = new createjs.Bitmap(this.cardType.dataURL);
		this.largeCard.addChild(largeCardBitmap);

		stage.addChildAt(this.smallCard, 0);

		this.smallCard.on("mouseover", function() {
			setPreviewCard(this);
		}, this);
	}

	render() {
		this.largeCard.cache(0, 0,
			originalCardDimensions.width,
			originalCardDimensions.height,
			0.2
		);

		var image = new Image()
		image.src = this.largeCard.getCacheDataURL();
		this.smallCard.image = image;

		this.largeCard.cache(0, 0,
			originalCardDimensions.width,
			originalCardDimensions.height,
			0.5
		);
	}

	goToField(field, callback) {
		callback = callback || function(){};
		
		stage.setChildIndex(this.smallCard, stage.numChildren - 1);
		
		createjs.Tween.get(this)
			.to({
				x: field.x,
				y: field.y
			}, 500)
			.call(callback);
	}
	
	get x() {
		return this.smallCard.x;
	}
	
	get y() {
		return this.smallCard.y;
	}
	
	set x(x) {
		this.smallCard.x = x;
	}
	
	set y(y) {
		this.smallCard.y = y;
	}
}

class Minion extends Card {
	constructor(cardType) {
		super(cardType);

		this.attack = cardType.data.attack;
		this.health = cardType.data.health;

		var attack = new createjs.Text("", "bold 100px monospace", "gray");
		var health = new createjs.Text("", "bold 100px monospace", "red");

		attack.name = "attack";
		health.name = "health";

		// TODO: calculate
		attack.set({x: 22, y: 240, lineHeight: 18});
		health.set({x: 150, y: 240, lineHeight: 18});

		this.largeCard.addChild(attack);
		this.largeCard.addChild(health);
	}

	render() {
		this.largeCard.getChildByName("attack").text = this.attack;
		this.largeCard.getChildByName("health").text = this.health;

		super.render();
	}
}

class Spell extends Card {
	constructor(cardType) {
		super(cardType);
	}
}

function cardFactory(cardType) {
	if(cardType.type == "minion")
	{
		return new Minion(cardType);
	}

	if(cardType.type == "spell")
	{
		return new Spell(cardType);
	}

	throw "a card must be either a minion or a spell";
}

function removeAllTargetOptions() {
	for(var x = 0; x < 5; x ++) {
		for(var y = 0; y < 4; y ++) {
			var field = fields[y][x];
			field.border.visible = false;
			field.image.removeAllEventListeners("click");
		}
	}
}
