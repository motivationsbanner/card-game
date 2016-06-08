```
game_command:
	server->client
	
		// Start Turn
		{command: "draw", cards: [string]} -> player
		{command: "draw", amount: int} -> enemy
		{command: "play_options", options: [position], abort: position}
		{command: "attack", attacker: position, target: position}
		{command: "set_health", target: position, health: int}
		{command: "set_attack", target: position, attack: int}
		{command: "minion_passive", target: position}
		{command: "kill", target: position}
		{command: "cast_spell", target: positoin}
		{command: "play_card", sender: pos: positionn, to: position, card_name: string}
		{command: "all_cards" , cards: [{name: string, attack: int, health: int, text: string}]}

	client->server
		{command: "end_turn"}
		{command: "select_option", pos: position}
```
