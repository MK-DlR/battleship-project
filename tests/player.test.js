// player.test.js

import { message, Player } from "../public/game/player.js";

test("player module imports correctly", () => {
  expect(message).toBe("Successfully linked player"); // check file is linked
});

test("player class can create both real and computer players", () => {
  const realPlayer = new Player("realPlayer", "human"); // new player, real
  const computerPlayer = new Player("computerPlayer", "computer"); // new player, computer

  expect(realPlayer.name).toBe("realPlayer"); // name
  expect(realPlayer.type).toBe("human"); // type
  expect(computerPlayer.name).toBe("computerPlayer"); // name
  expect(computerPlayer.type).toBe("computer"); // type
});

// each player object should contain its own gameboard
