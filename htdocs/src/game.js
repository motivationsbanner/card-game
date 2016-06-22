/**
 * card game
 * client: https://github.com/cravay/card-game
 * server: https://github.com/ceoy/Nodejs
 */

"use strict";

var previewCard = null;
var boardCenterX = (640 - largeCardDimensions.width - containerBorder.left - containerBorder.right) / 2 +
	largeCardDimensions.width + containerBorder.left + containerBorder.right;

function playerDrawCards(cards, callback) {
	if(!cards.length) {
		callback();
		return;
	}

	playerDrawCard(cards.shift(), function() {
		playerDrawCards(cards, callback);
	});
}

function playerDrawCard(cardName, callback) {
	playerDeck.getChildByName("amount").text --;

	rows.PlayerHand.forEach (function(field) {
		createjs.Tween.get(field).to({x: field.x - (smallCardDimensions.width + gap) / 2}, 450)
	});

	var x =  boardCenterX + (rows.PlayerHand.length - 2 + 1) * (smallCardDimensions.width / 2)
		+ (rows.PlayerHand.length - 1 + 1) * (gap / 2);
	var y = 480 - smallCardDimensions.height;

	var field = new CardField(playerDeck.x, playerDeck.y, cardName);
	rows.PlayerHand.push(field);

	createjs.Tween.get(field).to({x: x, y: y}, 500).call(callback);
}

function enemyDrawCards(amount, callback) {
	if(amount === 0) {
		callback();
		return;
	}

	enemyDrawCard(function() {
		enemyDrawCards(amount - 1, callback);
	});
}

function enemyDrawCard(callback) {
	enemyDeck.getChildByName("amount").text --;

	rows.EnemyHand.forEach (function(field) {
		createjs.Tween.get(field).to({x: field.x - (smallCardDimensions.width + gap) / 2}, 450)
	});

	var x =  boardCenterX + (rows.EnemyHand.length - 2 + 1) * (smallCardDimensions.width / 2)
		+ (rows.EnemyHand.length - 1 + 1) * (gap / 2);
	var y = 0;

	var field = new CardField(enemyDeck.x, enemyDeck.y);
	rows.EnemyHand.push(field);

	createjs.Tween.get(field).to({x: x, y: y}, 500).call(callback);
}

function setPlayOptions(options) {

	for(var option of options) {
		var field = getField(option.pos);
		field.showBorder(option.color);

		field.container.on("click", (function(row, index) {
			removeAllActionOptions();

			sendCommand({
				command: "select_option",
				pos: {row: row, index: index}
			});
		}).bind(this, option.pos.row, option.pos.index));
	}
}


function playCard(from, to, cardName, callback) {
	if(from.row !== "PlayerHand" && from.row !== "EnemyHand") {
		throw "a card can only played from a hand";
	}

	from.field = getField(from);
	to.field = getField(to);

	if(from.row === "EnemyHand") {
		from.field.setCard(cardName);
	}

	from.field.backup = to.field;
	rows[to.row][to.index] = from.field;

	updateHand(rows[from.row], from.index);
	rows[from.row].splice(from.index, 1);

	from.field.goToField(to.field, callback);
}

function removeAllActionOptions() {
	for(var name in rows) {
		for(var field of rows[name]) {
			field.removeBorder();
			field.container.removeAllEventListeners("click");
		}
	}
}

// TODO: set index (mustn't be in front of the arrow/sword)
function setPreviewCard(card) {
	if(previewCard) {
		stage.removeChild(previewCard.largeCard);
	}

	stage.addChild(card.largeCard);
	previewCard = card;
}

function setAttack(field, attack) {
	getField(field).card.attack = attack;
}

function setHealth(field, health) {
	getField(field).health = health;
}

// TODO: improve animation
function kill(field, callback) {
	var skull = new createjs.Bitmap(queue.getResult("totenkopf.png"));

	skull.x = getField(field).x
	skull.y = getField(field).y + 10;
	skull.alpha = 0;
	stage.addChild(skull);

	createjs.Tween.get(skull)
		.to({alpha: 1}, 100).wait(1000)
		.to({alpha: 0}, 100)
		.call(function() {
			stage.removeChild(skull);
			stage.removeChild(getField(field).container);
			rows[field.row][field.index] = getField(field).backup;
			callback();
		});

}

function attack(attacker, target, callback) {
	var sword;

	if(attacker.row === "PlayerMelee" || attacker.row === "EnemyMelee") {
		sword = new createjs.Bitmap(queue.getResult("schwert.png"));
	} else {
		// should be named arrow, but who cares
		sword = new createjs.Bitmap(queue.getResult("pfeil.png"));
	}

	attacker = getField(attacker);
	target = getField(target);

	sword.regX = sword.getBounds().width / 2;
	sword.regY = sword.getBounds().height / 2;

	sword.x = attacker.x + attacker.width / 2;
	sword.y = attacker.y + attacker.height / 2;

	stage.addChild(sword);

	sword.rotation = Math.atan((target.x - attacker.x) / (attacker.y - target.y)) / Math.PI * 180;

	if(target.y - attacker.y > 0) {
		sword.rotation += 180;
	}

	createjs.Tween.get(sword)
		.to({
			x: target.x + target.width / 2, 
			y: target.y + target.height / 2
		}, 1000)
		.call(function() {
			stage.removeChild(sword);
			callback();
		});
}

function glow(target, color, callback) {
	target = getField(target);

	target.glow(color, callback);
}

function startTurn() {
	if(!spectating) {
		changeTurnButton.container.on("click", endTurn, this, true);
	}

	changeTurnButton.container.getChildByName("player_turn").visible = true;
	changeTurnButton.container.getChildByName("enemy_turn").visible = false;
}

function endTurn() {
	removeAllActionOptions();
	changeTurnButton.container.getChildByName("enemy_turn").visible = true;
	changeTurnButton.container.getChildByName("player_turn").visible = false;
	sendCommand({command: "end_turn"});
}


function castSpell(sender, cardName, callback) {
	stage.removeChild(getField(sender).container);
	updateHand(rows[sender.row], sender.index);


	if(sender.row === "EnemyHand") {
		getField(sender).setCard(cardName);
	}

	var largeCardBitmap = new createjs.Bitmap(getField(sender).card.cardType.largeCardDataURL);
	largeCardBitmap.set({x: boardCenterX - largeCardDimensions.width / 2,
		y: (480 - largeCardDimensions.height) / 2, alpha: 0});



	stage.addChild(largeCardBitmap);

	rows[sender.row].splice(sender.index, 1);

	createjs.Tween.get(largeCardBitmap)
		.to({alpha: 1}, 300).wait(2000)
		.to({alpha: 0}, 300)
		.call(function() {
			stage.removeChild(largeCardBitmap);
			callback();
		});
}

function updateHand(row, index) {
	for(var i = 0; i < index; i ++) {
		createjs.Tween.get(row[i]).to({x: row[i].x + (smallCardDimensions.width + gap) / 2}, 450)
	}
		
	for(var i = index + 1; i < row.length; i ++) {
		createjs.Tween.get(row[i]).to({x: row[i].x - (smallCardDimensions.width + gap) / 2}, 450)
	}
}

function endGame(winner) {
	var message = new createjs.Bitmap(queue.getResult("btn_" + (winner ? "victory" : "defeat") + ".png"));

	message.alpha = 0;

	message.x = boardCenterX - message.getBounds().width / 2;
	message.y = (480 - message.getBounds().height) / 2;

	stage.addChild(message);

	changeTurnButton.container.getChildByName("enemy_turn").visible = true;
	changeTurnButton.container.getChildByName("player_turn").visible = false;
	changeTurnButton.container.removeAllEventListeners ();

	createjs.Tween.get(message).to({alpha: 1}, 300);
}

// TODO: overdraw
