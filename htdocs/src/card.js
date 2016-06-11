/**
 * card game
 * client: https://github.com/cravay/card-game
 * server: https://github.com/ceoy/Nodejs
 */

"use strict";

class Card {
	constructor(cardType) {
		this.cardType = cardType;
		
		this.smallCard = new createjs.Container();
		this.largeCard = new createjs.Container();

		this.largeCard.setTransform(containerBorder.left, 
			(480 - largeCardDimensions.height) / 2
		);

		var largeCardBitmap = new createjs.Bitmap(this.cardType.largeCardDataURL);
		this.largeCard.addChild(largeCardBitmap);

		var smallCardBitmap = new createjs.Bitmap(this.cardType.smallCardDataURL);
		this.smallCard.addChild(smallCardBitmap);

		stage.addChildAt(this.smallCard, 0);
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
		this.smallCard.cache(0, 0, smallCardDimensions.width, smallCardDimensions.height);

		// largeCard
		var largeCardAttack = new createjs.Text(cardType.attack, "bold 15px monospace", "red");
		var largeCardHealth = new createjs.Text(cardType.health, "bold 15px monospace", "brown");

		largeCardAttack.set({name: "attack", x: 12, y: 272, textAlign: "center"});
		largeCardHealth.set({name: "health", x: 147, y: 272, textAlign: "center"});

		this.largeCard.addChild(largeCardAttack, largeCardHealth);
		this.largeCard.cache(0, 0, largeCardDimensions.width, largeCardDimensions.height);
	}

	set attack(attack) {
		this.smallCard.getChildByName("attack").text = attack;
		this.largeCard.getChildByName("attack").text = attack;
		this.updateCache();
	}

	set health(health) {
		this.smallCard.getChildByName("health").text = health;
		this.largeCard.getChildByName("health").text = health;
		this.updateCache();
	}

	updateCache() {
		this.smallCard.updateCache();
		this.largeCard.updateCache();
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
