// gameController.js
// imports game objects, handles gameplay DOM, manages game flow
// focused on pure game logic (ships, attacks, win conditions)

import { Gameboard } from "./game/gameboard.js";
import { Player } from "./game/player.js";
import { Ship } from "./game/ship.js";
import { appState } from "./appController.js";

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

// new game function - creates completely fresh game data
function newGame() {
  // create gameboards
  const player1Gameboard = Gameboard();
  const player2Gameboard = Gameboard();

  // use custom player data from appState, with fallbacks
  const player1Name = appState.player1Name || "Player 1";
  const player2Name = appState.player2Name || "Computer";
  const player1Type = appState.player1Type || "human";
  const player2Type = appState.player2Type || "computer";

  const player1 = new Player(player1Name, player1Type, player1Gameboard);
  const player2 = new Player(player2Name, player2Type, player2Gameboard);

  // create ships
  const player1Ships = allShips.map(createFleet);
  const player2Ships = allShips.map(createFleet);

  console.log("New game created!");
  console.log(`Player 1: ${player1.name} (${player1.type})`);
  console.log(`Player 2: ${player2.name} (${player2.type})`);

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

// separate function for development testing setup
function setupTestScenario(gameData) {
  placeAllShips(gameData[0], player1Coords);
  placeAllShips(gameData[1], player2Coords);

  gameData[0].player.gameboard.receiveAttack(0, 0); // hit
  gameData[0].player.gameboard.receiveAttack(9, 9); // miss

  return gameData;
}

// DON'T initialize immediately - wait for createNewGame() to be called
let currentGameData = null;

function getCurrentGameData() {
  return currentGameData;
}

// create completely fresh, blank game (no test setup)
function createNewGame() {
  console.log("Creating fresh blank game...");
  currentGameData = setupTestScenario(newGame()); // Include test setup for now
  activePlayerIndex = 0;
  return currentGameData;
}

// handle changing player turn
let activePlayerIndex = 0;
const getActivePlayer = () => currentGameData[activePlayerIndex];
const switchPlayerTurn = () => {
  activePlayerIndex = activePlayerIndex === 0 ? 1 : 0;
};

// helper function to figure out board to attack
function attackOpponentBoard(x, y) {
  // get opponent's index (opposite of active player)
  const opponentIndex = activePlayerIndex === 0 ? 1 : 0;
  // get opponent's gameboard
  const opponentGameboard = currentGameData[opponentIndex].player.gameboard;
  // call receiveAttack on the opponent's board
  const result = opponentGameboard.receiveAttack(x, y);
  return result; // return "hit", "miss", or error message
}

export {
  message,
  createFleet,
  newGame,
  placeShipsForTesting,
  player1Coords,
  player2Coords,
  placeAllShips,
  getCurrentGameData,
  switchPlayerTurn,
  activePlayerIndex,
  getActivePlayer,
  createNewGame,
  attackOpponentBoard,
};
