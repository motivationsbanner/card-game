```
game_command:
	server->client
		// Start Turn
		{command: "draw", cards: [string]} -> player
		{command: "draw", amount: int} -> enemy
		{command: "play_options", options: [{pos: position, color: string}]}
		{command: "attack", attacker: position, target: position}
		{command: "set_health", target: position, health: int}
		{command: "set_attack", target: position, attack: int}
		{command: "kill", target: position}
		{command: "glow", target: position, color: string}
		{command: "play_card", sender: pos: position, to: position, card_name: string}
		{command: "start_turn"}
		{command: "end_game", winner: true/false}

	client->server
		{command: "end_turn"}
		{command: "select_option", pos: position}

preparation:
	server->client:
		emit("cards", [{name: string, attack: int, health: int, text: string}]);

	client->server:
		emit("start");
```
