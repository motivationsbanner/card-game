/**
 * card game
 * client: https://github.com/cravay/card-game
 * server: https://github.com/ceoy/Nodejs
 */

"use strict";

class Card {
	constructor(cardType) {
		this.cardType = cardType;
		
		this.container = new createjs.Container();
		var image = new createjs.Bitmap(this.cardType.bitmap);
		
		this.container.addChild(image);
		
		stage.addChildAt(this.container, 0);

		this.container.on("mouseover", function() {
			setPreviewCard(this);
		}, this);
	}
	
	render() {
		// can be implemented by child classes
	}
}

class Minion extends Card {
	constructor(cardType) {
		super(cardType);
		this.attack = cardType.data.attack;
		this.health = cardType.data.health;
	}
}

class RangedMinion extends Minion {
	constructor(cardType) {
		super(cardType);
	}
}

class MeleeMinion extends Minion {
	constructor(cardType) {
		super(cardType);
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
		return minionFactory(cardType);
	}

	if(cardType.type == "spell")
	{
		return new Spell(cardType);
	}
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

function minionFactory(cardType) {
	if(cardType.data.type == "ranged") {
		return new RangedMinion(cardType);
	}
	
	if(cardType.data.type == "melee") {
		return new MeleeMinion(cardType);
	}
	
	throw "minion must be ranged or melee";
}
