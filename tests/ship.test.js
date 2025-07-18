// ship.test.js
import { message, Ship } from "../public/game/ship.js";

test("ship module imports correctly", () => {
  expect(message).toBe("Successfully linked ship"); // check file is linked
});

// basic ship creation for test use
let ship;
beforeEach(() => {
  ship = new Ship("Battleship", 4, 0, false);
});

test("ship class creates objects with name, length, times hit, and sunk status", () => {
  expect(ship.name).toBe("Battleship"); // name
  expect(ship.length).toBe(4); // length
  expect(ship.hits).toBe(0); // times hit
  expect(ship.sunk).toBeFalsy(); // sunk status
});

test("ships should have a hit function that increases number of hits in ship", () => {
  expect(ship.hit()).toBe(1);
  expect(ship.hit()).toBe(2);
  expect(ship.hit()).toBe(3);
  expect(ship.hit()).toBe(4); // max amount of hits
  expect(ship.hit()).toBe("This ship is already sunk!");
});

test("isSunk should calculate whether a ship is considered sunk", () => {
  ship.hit();
  ship.hit();
  ship.hit();
  ship.hit(); // now at 4 hits, ship should be sunk
  expect(ship.sunk).toBe(true);
});
