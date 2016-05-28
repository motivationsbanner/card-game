// -1 means nothing there
// COMMENT ON A LATER DATE: WHAT?
function Feld(type)
{
	this.type = type;
	this.size = [-1,-1,-1];
}

// NOT NEEDED YET
function Minion(name, attack, health, text)
{
	this.name = name;
	this.attack = attack;
	this.health = health;
	this.text = text;
}

// NOT NEEDED YET
function Spell(name, buffAttack, buffHealth, text)
{
	this.name = name;
	this.buffAttack = buffAttack;
	this.buffHealth = buffHealth;
	this.text = text;
}


// Deck Class
function Deck()
{
	this.deck = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
}


// TODO:	- Random Cards from Deck
//			- Remove Cards from Deck
//			- Put Cards in Hand
Spieler.prototype.draw = function (amount)
{
	received_cards = [0,0,1];
	this.hand.push(received_cards[0],received_cards[1],received_cards[2]);
	return received_cards;
}


class Command {
	setType (commandType)
	{
		this.type = commandType;
	}
	
}

// var commandTypes = [
	// {name: "draw", card:},
	// {name: "attack", attacker: {/*pos*/}, target: {/*pos*/}}, // change position and send the other client
	// {name: "begin_turn"},
	// {name: "end_turn"},
	// {name: "damage", target: /*pos*/, damage: /*int*/},
	// {name: "heal"},
	// {name: "minion_passive"},
	// {name: "kill"},
	// {name: "cast_spell"},
	// {name: "buff"}

// http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}
