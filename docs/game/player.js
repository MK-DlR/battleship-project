// player.js

const message = "Successfully linked player";

// player class constructor
class Player {
  constructor(name, type, gameboard) {
    this.name = name; // player name
    this.type = type; // human or computer
    this.gameboard = gameboard; // new gameboard for player
  }
}

// exports
export { message, Player };
