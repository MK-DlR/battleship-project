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

  expect(player1Board[0][0].length).toBe(5); // Carrier is length 5
  expect(player2Board[0][0]).toBe("X"); // empty
  expect(player1Board[8][5]).toBe("X"); // empty
  expect(player2Board[8][5].length).toBe(2); // Patrol Boat length 2
});

// Are their ship arrays correctly populated with five ships?
test("both player gameboards are populated with 5 ships", () => {
  // test
});

// Does it place the ships in expected places (during testing phase)?
test("all 5 ships are correctly placed", () => {
  // test
});
