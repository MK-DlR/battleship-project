// gameboard.test.js

import { message, Gameboard } from "../public/game/gameboard.js";
import { Ship } from "../public/game/ship.js";

test("gameboard module imports correctly", () => {
  expect(message).toBe("Successfully linked gameboard"); // check file is linked
});

// basic ship creation for test use
let ship;
beforeEach(() => {
  ship = new Ship("Destroyer", 3, 0, false);
});

// basic board creation for test use
let freshBoard;
beforeEach(() => {
  freshBoard = Gameboard();
});

test("gameboard factory creates 10 x 10 board", () => {
  const boardArray = freshBoard.getBoard();

  expect(boardArray).toHaveLength(10); // 10 rows
  boardArray.forEach((row) => {
    expect(row).toHaveLength(10); // 10 columns per row
  });
});

test("gameboard places ships at specific coordinates by calling ship class", () => {
  const placed = freshBoard.placeShip(ship, 0, 0, "horizontal"); // place ship
  expect(placed).toBe(true);

  const boardArray = freshBoard.getBoard();
  expect(boardArray[0][0]).toBe(ship);
  expect(boardArray[0][1]).toBe(ship);
  expect(boardArray[0][2]).toBe(ship);
});

test("receiveAttack takes coords and determine if hit hits ship or misses and records coords", () => {
  freshBoard.placeShip(ship, 0, 0, "horizontal"); // place ship
  const hitCoords = freshBoard.receiveAttack(0, 0); // hit
  const missCoords = freshBoard.receiveAttack(5, 5); // miss
  const boardArray = freshBoard.getBoard();

  expect(ship.hits).toBe(1); // tests that hit method was called
  expect(hitCoords).toBe("hit"); // return hit status
  expect(missCoords).toBe("miss"); // return miss status
  expect(boardArray[0][0]).toBe("H"); // hit is marked on board
  expect(boardArray[5][5]).toBe("M"); // miss is marked on board
});

test("gameboard keeps track of missed attacks", () => {
  freshBoard.placeShip(ship, 0, 0, "horizontal"); // place ship

  freshBoard.receiveAttack(5, 5); // miss
  freshBoard.receiveAttack(7, 3); // miss
  freshBoard.receiveAttack(0, 0); // hit

  const missedAttacks = freshBoard.getMissedAttacks();
  expect(missedAttacks).toEqual([
    [5, 5],
    [7, 3],
  ]);
  expect(missedAttacks).toHaveLength(2); // only missed attacks, not hits
});

test("clearBoard should reset board to initial state after clearing", () => {
  freshBoard.placeShip(ship, 0, 0, "horizontal"); // place ship

  freshBoard.receiveAttack(0, 0); // hit
  freshBoard.receiveAttack(3, 3); // miss

  freshBoard.clearBoard();

  const missedAttacks = freshBoard.getMissedAttacks();
  const boardArray = freshBoard.getBoard();

  expect(boardArray[0][0]).toBe("X"); // hit is cleared
  expect(missedAttacks).toHaveLength(0); // miss is cleared

  const placed = freshBoard.placeShip(ship, 0, 0, "horizontal"); // place ship again
  expect(placed).toBe(true);
});

test("players cannot pick attack locations outside of the board", () => {
  const valid = freshBoard.receiveAttack(5, 5); // in bounds attack
  const invalid1 = freshBoard.receiveAttack(12, 12); // general out of bounds attack
  const invalid2 = freshBoard.receiveAttack(50, 0); // x axis out of bounds attack
  const invalid3 = freshBoard.receiveAttack(0, 50); // y axis out of bounds attack
  const invalid4 = freshBoard.receiveAttack(-1, -6); // negative coords out of bounds attack

  expect(valid).toBe("miss");
  expect(invalid1).toBe("Selection is out of bounds");
  expect(invalid2).toBe("Selection is out of bounds");
  expect(invalid3).toBe("Selection is out of bounds");
  expect(invalid4).toBe("Selection is out of bounds");
});

// report whether or not all ships have been sunk
test("gameboard reports whether or not all ships have been sunk", () => {
  const ship2 = new Ship("Patrol Boat", 2, 0, false); // new ship, patrol boat
  freshBoard.placeShip(ship, 0, 0, "horizontal"); // place ship, destroyer at (0,0)
  freshBoard.placeShip(ship2, 1, 1, "vertical"); // place ship, patrol boat at (1,1)

  expect(freshBoard.allShipsSunk()).toBe(false);

  // sink destroyer ship
  freshBoard.receiveAttack(0, 0);
  freshBoard.receiveAttack(1, 0);
  freshBoard.receiveAttack(2, 0);

  freshBoard.receiveAttack(6, 6); // missed attack to test edge case

  expect(freshBoard.allShipsSunk()).toBe(false);

  // sink patrol boat ship
  freshBoard.receiveAttack(1, 1);
  freshBoard.receiveAttack(1, 2);

  freshBoard.receiveAttack(4, 2); // missed attack to test edge case

  expect(freshBoard.allShipsSunk()).toBe(true);
});
