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
  player1.score = 0; // initialize score

  const player2 = new Player(player2Name, player2Type, player2Gameboard);
  player2.score = 0; // initialize score

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

/*
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
*/

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
    placeShip(playerData.player, ship, x, y, dir);
  });
}

/*
// separate function for development testing setup
function setupTestScenario(gameData) {
  placeAllShips(gameData[0], player1Coords);
  placeAllShips(gameData[1], player2Coords);

  return gameData;
}
  */

// DON'T initialize immediately - wait for createNewGame() to be called
let currentGameData = null;

let isGameOver = false;

function getCurrentGameData() {
  return currentGameData;
}

// create completely fresh, blank game (no test setup)
function createNewGame() {
  console.log("Creating fresh blank game...");
  // currentGameData = setupTestScenario(newGame()); // include test setup for now
  currentGameData = newGame();
  activePlayerIndex = 0;
  isGameOver = false; // reset on new game
  successfulAttack = undefined; // reset computer memory
  return currentGameData;
}

// player 1 randomize ship placement
function randomizeShips1() {
  // clear existing ships
  currentGameData[0].player.gameboard.clearBoard();
  // currentGameData[0].ships.length = 0;
  // reset and repopulate ship array
  currentGameData[0].ships = allShips.map(createFleet);

  console.log("Randomizing ships for Player 1...");

  // loop through each ship in fleet and attempt random placement until successful
  for (let ship of currentGameData[0].ships) {
    let placed = false;
    while (!placed) {
      const x = Math.floor(Math.random() * 10); // random x coords
      const y = Math.floor(Math.random() * 10); // random y coords
      const dir = Math.random() < 0.5 ? "horizontal" : "vertical";

      placed = currentGameData[0].player.gameboard.placeShip(ship, x, y, dir);
    }
  }
  console.log("Player 1 ships randomized!");
  appState.shipsPlaced.player1 = true;
}

// player 2 randomize ship placement
function randomizeShips2() {
  // clear existing ships
  currentGameData[1].player.gameboard.clearBoard();
  // currentGameData[0].ships.length = 0;
  // reset and repopulate ship array
  currentGameData[1].ships = allShips.map(createFleet);

  console.log("Randomizing ships for Player 2...");

  // loop through each ship in fleet and attempt random placement until successful
  for (let ship of currentGameData[1].ships) {
    let placed = false;
    while (!placed) {
      const x = Math.floor(Math.random() * 10); // random x coords
      const y = Math.floor(Math.random() * 10); // random y coords
      const dir = Math.random() < 0.5 ? "horizontal" : "vertical";

      placed = currentGameData[1].player.gameboard.placeShip(ship, x, y, dir);
    }
  }
  console.log("Player 2 ships randomized!");
  appState.shipsPlaced.player2 = true;
}
// start game
function startGame() {
  console.log("Starting game...");

  // check if both players have ships placed
  if (!appState.shipsConfirmed.player1 || !appState.shipsConfirmed.player2) {
    alert("Both players must place and confirm their ships before starting!");
    return;
  }

  // set game as started
  appState.gameStarted = true;

  // reset active player to player 1
  activePlayerIndex = 0;

  // re-render the game screen to reflect the new game state
  import("./displayController.js").then(({ renderGamescreen }) => {
    import("./layout.js").then(({ mainContent }) => {
      mainContent.innerHTML = "";
      renderGamescreen();
    });
  });

  console.log("Game started! It's Player 1's turn.");
}

// handle changing player turn
let activePlayerIndex = 0;
const getActivePlayer = () => currentGameData[activePlayerIndex];
const switchPlayerTurn = () => {
  activePlayerIndex = activePlayerIndex === 0 ? 1 : 0;
};

let successfulAttack;

// attack enemy board function
function attackOpponentBoard(x, y) {
  // get opponent's index (opposite of active player) and gameboard
  const opponentIndex = activePlayerIndex === 0 ? 1 : 0;
  const opponentGameboard = currentGameData[opponentIndex].player.gameboard;

  // check if game is over
  if (isGameOver) {
    return;
  }
  // human player attack
  if (getActivePlayer().player.type === "human") {
    const result = opponentGameboard.receiveAttack(x, y);
    checkEndgame(); // check for endgame conditions
    return result; // return "hit", "miss", or error message
  }
  // computer player attack
  if (getActivePlayer().player.type === "computer") {
    const validCoords = [];
    let computerX, computerY;
    let result;

    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        // find all valid cells
        let cellValue = opponentGameboard.getCell(x, y);
        if (cellValue != "H" && cellValue != "M") {
          // push valid cell coordinates to array
          validCoords.push([x, y]);
        }
      }
    }
    if (validCoords.length === 0) {
      return "No valid attacks left, start a new game.";
    } else {
      // if no previous successful attack, proceed normally
      if (successfulAttack === undefined) {
        // if validCoords has items pick a random one
        let randomCoord =
          validCoords[Math.floor(Math.random() * validCoords.length)];
        console.log(randomCoord);
        // log the coordinates
        computerX = randomCoord[0];
        computerY = randomCoord[1];
        // if previous successful attack
      } else if (successfulAttack != undefined) {
        console.log("Previous successful attack:", successfulAttack);
        const adjacentCoords = [
          [0, -1], // north
          [0, +1], // south
          [+1, 0], // east
          [-1, 0], // west
        ];
        // generate adjacent coordinates from successfulAttack
        let possibleAttacks = adjacentCoords.map(([offsetX, offsetY]) => [
          successfulAttack[0] + offsetX,
          successfulAttack[1] + offsetY,
        ]);
        // filter possibleAttacks against validCoords
        let filteredAttacks = possibleAttacks.filter(([x, y]) => {
          if (x < 0 || x > 9 || y < 0 || y > 9) return false;
          return validCoords.some(([vx, vy]) => vx === x && vy === y);
        });
        // then randomly select from filtered options
        let targetedCoord;
        if (filteredAttacks.length > 0) {
          targetedCoord =
            filteredAttacks[Math.floor(Math.random() * filteredAttacks.length)];
        } else {
          // fallback to random selection from validCoords if no valid attacks
          targetedCoord =
            validCoords[Math.floor(Math.random() * validCoords.length)];
          successfulAttack = undefined;
        }
        // log the coordinates
        computerX = targetedCoord[0];
        computerY = targetedCoord[1];
      }
      // use coordinates to attack
      result = opponentGameboard.receiveAttack(computerX, computerY);
      // store coordinates if attack is a hit
      if (result === "hit") {
        successfulAttack = [computerX, computerY];
        console.log(successfulAttack);
      }
    }
    console.log(`Computer attacking (${computerX}, ${computerY}) → ${result}`);
    checkEndgame(); // check for endgame conditions
    return result; // return "hit", "miss", or error message
  } else {
    console.log("Player type error");
  }
}

// check if both players are human
function isBothPlayersHuman() {
  const gameData = getCurrentGameData();
  return (
    gameData[0].player.type === "human" && gameData[1].player.type === "human"
  );
}

// end game conditions
function checkEndgame() {
  // get opponent's index (opposite of active player) and gameboard
  const opponentIndex = activePlayerIndex === 0 ? 1 : 0;
  const opponentGameboard = currentGameData[opponentIndex].player.gameboard;

  if (opponentGameboard.allShipsSunk()) {
    console.log("All ships sunk");
    triggerEndgame();
  } else {
    console.log("Ships still present");
  }
}

// trigger game over
function triggerEndgame() {
  // display game over notification and winner
  alert(`Game over! 🎉 ${getActivePlayer().player.name} wins! 🎉`);
  // increment player score
  getActivePlayer().player.score += 1;

  // update the appState scores for UI sync
  if (activePlayerIndex === 0) {
    appState.scores.player1 += 1;
  } else {
    appState.scores.player2 += 1;
  }

  // set game status to game over
  isGameOver = true;
}

export {
  message,
  createFleet,
  newGame,
  // placeShipsForTesting,
  // player1Coords,
  // player2Coords,
  placeAllShips,
  getCurrentGameData,
  switchPlayerTurn,
  randomizeShips1,
  randomizeShips2,
  isBothPlayersHuman,
  startGame,
  activePlayerIndex,
  getActivePlayer,
  createNewGame,
  attackOpponentBoard,
};
