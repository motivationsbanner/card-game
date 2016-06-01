
function drawCommand(data, player, game)
{
// Ja kek
}

function change_turnCommand(data, game)
{
	// Change turn
	game.changeTurn();
	
	// Actions happening after turn change here:
	game.getOnTurn().draw(1);
	game.getNotOnTurn().enemyDraw(1);
	// send new possible cards.
	game.getOnTurn().getPlayOptions();
}



// Only 1 Select_Option atm (chose and confirm)
function select_optionCommand(data, game)
{
	if ( game.getOnTurn().getSelectedCard() != -1 )
	{
		// Do Card Action
		game.getOnTun().currentCardActivate(data.pos);
		game.getOnTurn().setSelectedCard(-1);
	} else {
		game.getOnTurn().setSelectedCard(data.pos);
		game.playOptions();
	}
	
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
		
		if (data.command == "select_option")
		{
			select_optionCommand(data, game);
		}
	}
}


module.exports = commandInterpreter;