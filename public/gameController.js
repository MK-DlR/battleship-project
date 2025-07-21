// gameController.js
// imports game objects, handles gameplay DOM, manages game flow)

// imports
import { Gameboard, message } from "./game/gameboard.js";
import { Player } from "./game/player.js";
import { Ship } from "./game/ship.js";

console.log("Hello world");
console.log("Gameboard message:", message);

// Create gameboard and pass it to player
const playerGameboard = Gameboard();
const player1 = new Player("Player 1", "human", playerGameboard);
