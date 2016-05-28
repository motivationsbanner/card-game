/**
 * card game
 * client: https://github.com/cravay/card-game
 * server: https://github.com/ceoy/Nodejs
 */
 
"use strict";

class Field {
	constructor (type)
	{
		this.field = [-1, -1, -1, -1, -1];
		this.type = type;
	}
}

module.exports = function field(type)
{
	return new Field(type);
}