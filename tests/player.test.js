// player.test.js

import { message, Player } from "../public/game/player.js";
import { Ship } from "../public/game/ship.js";
import { Gameboard } from "../public/game/gameboard.js";

test("player module imports correctly", () => {
  expect(message).toBe("Successfully linked player"); // check file is linked
});

test("player class can create both real and computer players", () => {
  // create gameboards
  const realGameboard = Gameboard();
  const compGameboard = Gameboard();
  const realPlayer = new Player("realPlayer", "human", realGameboard); // new player, real
  const computerPlayer = new Player(
    "computerPlayer",
    "computer",
    compGameboard
  ); // new player, computer

  expect(realPlayer.name).toBe("realPlayer"); // name
  expect(realPlayer.type).toBe("human"); // type
  expect(computerPlayer.name).toBe("computerPlayer"); // name
  expect(computerPlayer.type).toBe("computer"); // type
});

test("each player object contains its own gameboard", () => {
  // create gameboards
  const realGameboard = Gameboard();
  const compGameboard = Gameboard();
  const realPlayer = new Player("realPlayer", "human", realGameboard); // new player, real
  const computerPlayer = new Player(
    "computerPlayer",
    "computer",
    compGameboard
  ); // new player, computer
  const ship1 = new Ship("Destroyer", 3, 0, false); // new destroyer ship for real player
  const ship2 = new Ship("Destroyer", 3, 0, false); // new destroyer ship for computer player
  const realBoard = realPlayer.gameboard.getBoard();
  const compBoard = computerPlayer.gameboard.getBoard();

  realPlayer.gameboard.placeShip(ship1, 0, 0, "horizontal"); // real player place ship
  computerPlayer.gameboard.placeShip(ship2, 5, 5, "vertical"); // computer player place ship

  realPlayer.gameboard.receiveAttack(0, 0); // hit on real player
  computerPlayer.gameboard.receiveAttack(0, 0); // miss on computer player

  expect(realBoard[0][0]).toBe("H");
  expect(compBoard[0][0]).toBe("M");
});
