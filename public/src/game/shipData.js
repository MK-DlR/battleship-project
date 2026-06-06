// src/game/shipData.js

import { Ship } from "./ship.js";

// ship specifications
let allShips = [
  {
    name: "Carrier",
    length: 5,
    hits: 0,
    sunk: false,
  },
  {
    name: "Battleship",
    length: 4,
    hits: 0,
    sunk: false,
  },
  {
    name: "Destroyer",
    length: 3,
    hits: 0,
    sunk: false,
  },
  {
    name: "Submarine",
    length: 3,
    hits: 0,
    sunk: false,
  },
  {
    name: "Patrol Boat",
    length: 2,
    hits: 0,
    sunk: false,
  },
];

// ship generation function
function createFleet(newShip) {
  return new Ship(newShip.name, newShip.length, newShip.hits, newShip.sunk);
}

export { allShips, createFleet };
