"use strict";

var MeleeMinion = require(__dirname + '/MeleeMinion.js');

var krieger = class Krieger extends MeleeMinion {
	constructor (cardType, id)
	{
		super(cardType, "Krieger");
		this.id = id;
	}
}

module.exports = krieger;