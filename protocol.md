```
game_command:
	server->client
		{command: "draw", cards: [...]}
			{command: "draw", cards: [..]} 	-> player
			{command: "draw", amount: int} 	-> enemy
		{command: "attack", attacker: ..., target: ...}
		{command: "begin_turn"}
		{command: "end_turn"}
		{command: "damage", target: ..., damage: ...}
		{command: "heal", target: ..., heal: ...}
		{command: "minion_passive", target: ...}
		{command: "kill", target: ...}
		{command: "cast_spell", target: ...}
		{command: "buff", target: ..., health: ..., attack: ...}

	client->server
		{command: "end_turn"}
```
