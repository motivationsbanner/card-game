```
game_command:
	server->client
		{command: "draw", cards: [string]} -> player
		{command: "draw", amount: int} -> enemy
		{command: "play_options", options: [{pos: position, color: string}]}
		{command: "attack", attacker: position, target: position}
		{command: "set_health", target: position, health: int}
		{command: "set_attack", target: position, attack: int}
		{command: "kill", target: position}
		{command: "glow", target: position, color: string}
		{command: "play_card", sender: position, to: position, card_name: string}
		{command: "start_turn"}
		{command: "cast_spell", sender: position, card_name: string}
		{command: "end_game", winner: true/false}
		{command: "name", name: string }
		{command: "game_id, id: string }
		{command: "overdraw", card: cardname }
		{command: "overdraw" }
		{command: "change_turn}
				
	client->server
		{command: "end_turn"}
		{command: "select_option", pos: position}

preparation:
	server->client:
		emit("cards", [{name: string, attack: int, health: int, text: string}]);

	client->server:
		emit("start", {deck: deckString, name: String});
		emit("spectate", {id: String, name: String});
```
