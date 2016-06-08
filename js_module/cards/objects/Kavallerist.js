"use strict";
var text = "Der Kavallerist ist eine sehr starke Person.";
var health = 5;
var attack = 5;

var MeleeMinion = require(__dirname + '/../MeleeMinion.js');

var kavallerist = class Kavallerist extends MeleeMinion {
	constructor ()
	{
		super();
		this.setText(text);
		console.log(this.text);
		
	}
	
	static get name() {
		return "Kavallerist";
	}
	
	static get text() {
		return text;
	}
	
	static get attack() {
		return attack;
	}
	
	static get health() {
		return health;
	}
	
}


module.exports = kavallerist;