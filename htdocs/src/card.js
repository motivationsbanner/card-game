/**
 * card game
 * client: https://github.com/cravay/card-game
 * server: https://github.com/ceoy/Nodejs
 */

class Card {
	constructor(cardType) {
		this.cardType = cardType;
		
		this.container = new createjs.Container();
		var image = new createjs.Bitmap(this.cardType.bitmap);
		
		this.container.addChild(image);
		
		stage.addChildAt(this.container, 0);

		// example: {red: createjs.Bitmap, white: createjs.Bitmap}
		this.borders = {};

		this.container.on("mouseover", function() {
			setPreviewCard(this);
		}, this);
	}	
	

	hideBorder(color) {
		this.borders[color].set({"visible": false});
	}

	showBorder(color) {
		if(!this.borders[color]) {
			this.borders[color] = new createjs.Bitmap(borderImages[color]);

			this.borders[color].set({
				x: - 6,
				y: - 6
			});
		
			this.container.addChild(this.borders[color]);
		}
		
		this.borders[color].visible = true;
	}

	isPlayable() {
		 return true;
	}

	play(callback) {
		callback();
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
	deselect() {
		this.hideBorder("red");
		this.container.removeAllEventListeners("click");		
	}
	play(callback) {
		var card = this;

		card.showBorder("red");
		
		card.container.on("click", function() {
			card.deselect();
			removeAllTargetOptions();
			callback();
		});

		card.getPossibleTargets().forEach(function(target) {
			var field = fields[target.y][target.x];
			field.border.visible = true;

			field.image.on("click", function() {
				card.deselect();
				field.card = card;
				playerHand.splice(playerHand.indexOf(card), 1);
				removeAllTargetOptions();
				stage.setChildIndex(card.container, stage.numChildren - 1);

				createjs.Tween.get(card.container)
					.to({
						x: field.image.x,
						y: field.image.y
					}, 500)
					.call(callback);
			});
		});
	}
}

class RangedMinion extends Minion {
	constructor(cardType) {
		super(cardType);
	}
	
	getPossibleTargets() {
		return getEmptyFieldsInRow(3);
	}
}

class MeleeMinion extends Minion {
	constructor(cardType) {
		super(cardType);
	}

	getPossibleTargets() {
		return getEmptyFieldsInRow(2);
	}
}

function getEmptyFieldsInRow(row) {
	var possibleTargets = [];
	
	for(var x = 0; x < width; x ++) {
		if(!fields[row][x].card) {
			possibleTargets.push({x: x, y: row});
		}
	}

	return possibleTargets;
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
