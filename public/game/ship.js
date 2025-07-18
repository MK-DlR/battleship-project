// ship.js

const message = "Successfully linked ship";

// Ship class constructor
class Ship {
  constructor(name, length, hits, sunk) {
    this.name = name; // Carrier, Battleship, Destroyer, Submarine, Patrol Boat
    this.length = length; // 5, 4, 3, 3, 2
    this.hits = hits; // 0
    this.sunk = sunk; // false
  }

  hit() {
    this.hits++;
    // if hits is equal to length of ship, mark as sunk
    if (this.hits === this.length) {
      this.isSunk();
    }
    // if hits is greater than length of ship, notify user it's already sunk
    if (this.hits > this.length) {
      return "This ship is already sunk!";
    }
    return this.hits;
  }

  isSunk() {
    // if hits is equal to length of ship, mark as sunk
    if (this.hits >= this.length) {
      this.sunk = true;
    }
  }
}

// exports
export { message, Ship };
