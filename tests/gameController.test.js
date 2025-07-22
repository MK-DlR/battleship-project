// gameController.test.js

import {
  message,
  createFleet,
  newGame,
  placeShipsForTesting,
  player1Coords,
  player2Coords,
  placeAllShips,
} from "../public/gameController.js";

test("gamecontroller module imports correctly", () => {
  expect(message).toBe("Successfully linked gamecontroller"); // check file is linked
});

// basic game creation for test use
let gameData;
beforeEach(() => {
  gameData = newGame();
  placeAllShips(gameData[0], player1Coords);
  placeAllShips(gameData[1], player2Coords);
});

test("successfully creates 2 players with the correct types", () => {
  expect(gameData[0].player.name).toBe("Player 1");
  expect(gameData[0].player.type).toBe("human");
  expect(gameData[1].player.name).toBe("Player 2");
  expect(gameData[1].player.type).toBe("computer");
});

test("both player gameboards are distinct from each other", () => {
  const player1Board = gameData[0].player.gameboard.getBoard();
  const player2Board = gameData[1].player.gameboard.getBoard();

  expect(player1Board[0][0].length).toBe(5); // Carrier length 5
  expect(player2Board[0][0]).toBe("X"); // empty
  expect(player1Board[8][5]).toBe("X"); // empty
  expect(player2Board[8][5].length).toBe(2); // Patrol Boat length 2
});

test("both player gameboards are populated with 5 ships", () => {
  const player1Board = gameData[0].player.gameboard.getBoard();
  const player2Board = gameData[1].player.gameboard.getBoard();

  const uniqueShips1 = new Set();
  const uniqueShips2 = new Set();

  for (let row of player1Board) {
    for (let cell of row) {
      if (cell !== "X" && cell !== "H" && cell !== "M") {
        uniqueShips1.add(cell); // store the ship object
      }
    }
  }

  for (let row of player2Board) {
    for (let cell of row) {
      if (cell !== "X" && cell !== "H" && cell !== "M") {
        uniqueShips2.add(cell); // store the ship object
      }
    }
  }

  expect(uniqueShips1.size).toBe(5);
  expect(uniqueShips2.size).toBe(5);
});

function verifyShipPlacement(board, ships, coords) {
  for (let i = 0; i < ships.length; i++) {
    const ship = ships[i];
    const [x, y, dir] = coords[i];

    for (let j = 0; j < ship.length; j++) {
      let cell;
      if (dir === "horizontal") {
        cell = board[y][x + j];
      } else if (dir === "vertical") {
        cell = board[y + j][x];
      }

      expect(cell).toBe(ship);
    }
  }
}

test("all 5 ships are correctly placed", () => {
  const player1Board = gameData[0].player.gameboard.getBoard();
  const player2Board = gameData[1].player.gameboard.getBoard();

  verifyShipPlacement(player1Board, gameData[0].ships, player1Coords);
  verifyShipPlacement(player2Board, gameData[1].ships, player2Coords);
});
