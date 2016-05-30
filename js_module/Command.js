
function drawCommand(data, player, game)
{
// Ja kek
}

function change_turnCommand(data, game)
{
	// Change turn
	game.getOnTurn().sendCommandMessage({command: "end_turn"});
	game.changeTurn();
	game.getOnTurn().sendCommandMessage({command: "start_turn"});
	
	// Actions happening after turn change here:
	game.getOnTurn().draw(1);
	game.getNotOnTurn().enemyDraw(1);
}


var commandInterpreter = function (data, player, game)
{
	if (player != -1)
	{
		if (data.command == "draw")
		{
			drawCommand(data, player, game);
		}
		
		if (data.command == "change_turn")
		{
			change_turnCommand(data, game);
		}
	}
}


module.exports = commandInterpreter;