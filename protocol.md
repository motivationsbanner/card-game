```
game_command:
	server->client
	
		// Start Turn
		{command: "draw", cards: [...]}
			{command: "draw", cards: [...]}	-> player
			{command: "draw", amount: int} 	-> enemy
		{command: "play_options", options: [{row, index}]}
		
		{command: "attack", attacker: ..., target: ...}
		{command: "damage", target: ..., damage: ...}
		{command: "heal", target: ..., heal: ...}
		{command: "minion_passive", target: ...}
		{command: "kill", target: ...}
		{command: "cast_spell", target: ...}
		{command: "buff", target: ..., health: ..., attack: ...}
		{command: "play_card", from: pos: {row, index}, to: pos: {row, index}, cardID: int} -> player & enemy (different positions)

	client->server
		{command: "end_turn"}
		{command: "select_option", pos: {row, index} *siehe fieldPos.md*}
		
```
