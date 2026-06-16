// tests/gameController.test.js

jest.mock("../public/src/controllers/appController.js", () => ({
  appState: {
    player1Name: "Player 1",
    player2Name: "Player 2",
    player1Type: "human",
    player2Type: "computer",
  },
}));

jest.mock("../public/src/controllers/battleLogController.js", () => ({
  addBattleLogEntry: jest.fn(),
}));

jest.mock("../public/src/controllers/modalController.js", () => ({
  showAlertModal: jest.fn(),
}));

import {
  message,
  createFleet,
  newGame,
  placeAllShips,
} from "../public/src/controllers/gameController.js";

test("gamecontroller module imports correctly", () => {
  expect(message).toBe("Successfully linked gamecontroller"); // check file is linked
});

// basic game creation for test use
let gameData;
beforeEach(() => {
  gameData = newGame();

  const p1Coords = [
    [0, 0, "horizontal"],
    [0, 1, "horizontal"],
    [0, 2, "horizontal"],
    [0, 3, "horizontal"],
    [0, 4, "horizontal"],
  ];

  const p2Coords = [
    [5, 0, "vertical"],
    [6, 0, "vertical"],
    [7, 0, "vertical"],
    [8, 0, "vertical"],
    [9, 0, "vertical"],
  ];

  gameData[0].ships.forEach((ship, i) => {
    gameData[0].player.gameboard.placeShip(ship, ...p1Coords[i]);
  });

  gameData[1].ships.forEach((ship, i) => {
    gameData[1].player.gameboard.placeShip(ship, ...p2Coords[i]);
  });
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
  const foundShip = player2Board.flat().includes(gameData[1].ships[4]);

  expect(player1Board[0][0].length).toBe(5); // Carrier length 5
  expect(player2Board[0][0]).toBe("X"); // empty
  expect(player1Board[8][5]).toBe("X"); // empty
  expect(foundShip).toBe(true);
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

test("all ships are placed without overlap", () => {
  const board = gameData[0].player.gameboard.getBoard();

  const placedShips = new Set();

  for (let row of board) {
    for (let cell of row) {
      if (cell !== "X" && cell !== "H" && cell !== "M") {
        placedShips.add(cell);
      }
    }
  }

  expect(placedShips.size).toBe(5);
});
