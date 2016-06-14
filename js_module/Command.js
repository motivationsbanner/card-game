
function drawCommand(data, player, game)
{
// OUI OUI BAGUETTE
}

function change_turnCommand(data, game)
{
	// Change turn
	game.changeTurn();
	
	// Actions happening after turn change here:
	game.getOnTurn().draw(1);
	game.getNotOnTurn().enemyDraw(1);
	
	// send new possible cards.
	game.playOptions();
}



// Only 1 Select_Option atm (chose and confirm)
function select_optionCommand(data, game)
{
	
	// Check if there is a selected Card
	if ( game.getOnTurn().getSelectedCard() != -1 )
	{
		// Check Abort
		if ( game.getOnTurn().getSelectedCard().row === data.pos.row && game.getOnTurn().getSelectedCard().index === data.pos.index)
		{
			game.getOnTurn().setSelectedCard(-1);
			game.playOptions();
			return;
		}
	
		// Activate selected Card
		game.getOnTurn().currentCardActivate(data.pos, game);
		game.getOnTurn().setSelectedCard(-1);
		game.playOptions();
	} else {
		// Set Card
		game.getOnTurn().setSelectedCard(data.pos);
		game.playOptions();
	}
	
}

var commandInterpreter = function (data, player, game)
{
	if (player == game.getOnTurn())
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
