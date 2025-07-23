// gameController.js
// imports game objects, handles gameplay DOM, manages game flow

// imports
import { Gameboard } from "./game/gameboard.js";
import { Player } from "./game/player.js";
import { Ship } from "./game/ship.js";

const message = "Successfully linked gamecontroller";

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

// new game function
function newGame() {
  // create gameboards
  const player1Gameboard = Gameboard();
  const player2Gameboard = Gameboard();
  // create players - TEMPORARY for testing
  const player1 = new Player("Player 1", "human", player1Gameboard);
  const player2 = new Player("Player 2", "computer", player2Gameboard);
  // ends here
  // create ships
  const player1Ships = allShips.map(createFleet);
  const player2Ships = allShips.map(createFleet);

  return [
    {
      player: player1,
      ships: player1Ships,
    },
    {
      player: player2,
      ships: player2Ships,
    },
  ];
}

const gameData = newGame();

// manually place ships - TEMPORARY for testing
function placeShipsForTesting(player, ship, x, y, dir) {
  player.gameboard.placeShip(ship, x, y, dir);
}

// player 1 - horizontal ships placed on different rows, no overlap
let player1Coords = [
  [0, 0, "horizontal"], // Carrier (length 5)
  [0, 1, "horizontal"], // Battleship (length 4)
  [0, 2, "horizontal"], // Destroyer (length 3)
  [0, 3, "horizontal"], // Submarine (length 3)
  [0, 4, "horizontal"], // Patrol Boat (length 2)
];

// player 2 - vertical ships placed on different columns, no overlap
let player2Coords = [
  [9, 5, "vertical"], // Carrier (length 5)
  [8, 6, "vertical"], // Battleship (length 4)
  [7, 7, "vertical"], // Destroyer (length 3)
  [6, 7, "vertical"], // Submarine (length 3)
  [5, 8, "vertical"], // Patrol Boat (length 2)
];

function placeAllShips(playerData, coords) {
  // error if ship and coords are not same length
  if (playerData.ships.length !== coords.length) {
    throw new Error("Mismatch between ships and placement coordinates");
  }
  playerData.ships.forEach((ship, index) => {
    const [x, y, dir] = coords[index];
    console.log(
      `Placing ${ship.name} for ${playerData.player.name} at (${x}, ${y}) ${dir}`
    );
    placeShipsForTesting(playerData.player, ship, x, y, dir);
  });
}

placeAllShips(gameData[0], player1Coords);
placeAllShips(gameData[1], player2Coords);
// ends here

export {
  message,
  createFleet,
  newGame,
  placeShipsForTesting,
  player1Coords,
  player2Coords,
  placeAllShips,
  gameData,
};
