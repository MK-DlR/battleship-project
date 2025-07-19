// player.js

// imports
import { Gameboard } from "./gameboard.js";

const message = "Successfully linked player";

// each player object should contain its own gameboard

// player class constructor
class Player {
  constructor(name, type) {
    this.name = name; // player name
    this.type = type; // human or computer
  }
}

// exports
export { message, Player };
