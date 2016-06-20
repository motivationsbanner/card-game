/**
 * card game
 * client: https://github.com/cravay/card-game
 * server: https://github.com/ceoy/Nodejs
 */

"use strict";

class Card {
	constructor(cardType) {
		this.cardType = cardType;
		var self = this;

		// largeCard		
		this.largeCard = new createjs.Container();
		this.largeCard.setTransform(containerBorder.left, 
			(480 - largeCardDimensions.height) / 2
		);

		var largeCardImage = new Image();

		largeCardImage.addEventListener("load", function() {
			var largeCardBitmap = new createjs.Bitmap(largeCardImage);
			self.largeCard.addChildAt(largeCardBitmap, 0);
		});

		largeCardImage.src = this.cardType.largeCardDataURL;

		// smallCard
		this.smallCard = new createjs.Container();
		var smallCardImage = new Image();

		smallCardImage.addEventListener("load", function() {
			var smallCardBitmap = new createjs.Bitmap(smallCardImage);
			self.smallCard.addChildAt(smallCardBitmap, 0);
		});

		smallCardImage.src = this.cardType.smallCardDataURL;
	}
}

class Minion extends Card {
	constructor(cardType) {
		super(cardType);

		// smallCard
		var smallCardAttack = new createjs.Text(cardType.attack, "bold 15px monospace", "red");
		var smallCardHealth = new createjs.Text(cardType.health, "bold 15px monospace", "brown");

		smallCardAttack.set({name: "attack", x: 10, y: 48, textAlign: "center"});
		smallCardHealth.set({name: "health", x: 39, y: 48, textAlign: "center"});

		this.smallCard.addChild(smallCardAttack, smallCardHealth);

		// largeCard
		var largeCardAttack = new createjs.Text(cardType.attack, "bold 15px monospace", "red");
		var largeCardHealth = new createjs.Text(cardType.health, "bold 15px monospace", "brown");

		largeCardAttack.set({name: "attack", x: 12, y: 272, textAlign: "center"});
		largeCardHealth.set({name: "health", x: 147, y: 272, textAlign: "center"});

		this.largeCard.addChild(largeCardAttack, largeCardHealth);
	}

	set attack(attack) {
		this.smallCard.getChildByName("attack").text = attack;
		this.largeCard.getChildByName("attack").text = attack;
	}

	set health(health) {
		this.smallCard.getChildByName("health").text = health;
		this.largeCard.getChildByName("health").text = health;
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
