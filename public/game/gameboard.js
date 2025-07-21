// gameboard.js

// imports
import { Ship } from "./ship.js";

const message = "Successfully linked gameboard";

// factory to create Gameboard
function Gameboard() {
  const rows = 10;
  const columns = 10;
  const board = [];
  let ships = [];
  // nested for loop to create 2D array for gameboard
  const createBoard = function () {
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i].push("X");
      }
    }

    return board;
  };

  createBoard();

  // place ships at specific coordinates by calling Ship class
  const placeShip = function (ship, x, y, dir) {
    // check if ship is already placed
    for (let i = 0; i < ship.length; i++) {
      if (ships.includes(ship)) {
        console.log("Ship already placed");
        return false;
      }
    }
    if (dir === "horizontal") {
      // directional check
      if (y + ship.length > columns) {
        console.log("Ship won't fit horizontally");
        return false;
      }
      // check if cells are free
      for (let i = 0; i < ship.length; i++) {
        if (board[x][y + i] !== "X") {
          console.log("Space already occupied");
          return false;
        }
      }
      // place ship
      for (let i = 0; i < ship.length; i++) {
        board[x][y + i] = ship;
      }
      ships.push(ship);
      return true;
    } else if (dir === "vertical") {
      // directional check
      if (x + ship.length > rows) {
        console.log("Ship won't fit vertically");
        return false;
      }
      // check if cells are free
      for (let i = 0; i < ship.length; i++) {
        if (board[x + i][y] !== "X") {
          console.log("Space already occupied");
          return false;
        }
      }
      // place ship
      for (let i = 0; i < ship.length; i++) {
        board[x + i][y] = ship;
      }
      ships.push(ship);
      return true;
    } else {
      console.log("Invalid direction");
      return false;
    }
  };

  const missedAttacks = []; // track missed attack coordinates

  // take pair of coordinates and determine if attack is a hit
  const receiveAttack = function (x, y) {
    // ensure coordinates are within board boundaries
    if (x > 9 || y > 9 || x < 0 || y < 0) {
      return "Selection is out of bounds";
    }
    // check that selected spot hasn't been attacked yet
    if (board[x][y] !== "X" && board[x][y] !== "H" && board[x][y] !== "M") {
      board[x][y].hit();
      board[x][y] = "H";
      return "hit";
    }
    if (board[x][y] === "X") {
      board[x][y] = "M";
      missedAttacks.push([x, y]); // store missed coordinates
      return "miss";
    } else if (board[x][y] === "H" || board[x][y] === "M") {
      return "Location has already been attacked, choose a different location";
    }
  };

  const allShipsSunk = function () {
    for (const ship of ships) {
      if (!ship.sunk) return false;
    }
    return true;
  };

  const clearBoard = function () {
    board.length = 0;
    ships.length = 0;
    missedAttacks.length = 0;
    createBoard();
  };

  const getBoard = () => board;

  const getMissedAttacks = () => missedAttacks;

  return {
    placeShip,
    receiveAttack,
    getBoard,
    getMissedAttacks,
    allShipsSunk,
    clearBoard,
  };
}

// exports
export { message, Gameboard };
