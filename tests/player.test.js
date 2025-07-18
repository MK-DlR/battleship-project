// player.test.js

import { message, Player } from "../public/game/player.js";

test("player module imports correctly", () => {
  expect(message).toBe("Successfully linked player"); // check file is linked
});

// two types of players in the game, ‘real’ players and ‘computer’ players
// each player object should contain its own gameboard
