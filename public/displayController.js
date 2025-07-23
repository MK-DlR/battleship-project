// displayController.js
// renders each players gameboard and ships, ui, etc

import { mainContent } from "./layout.js";
import { Ship } from "./game/ship.js";
import { gameData } from "./gameController.js"; // import the game state

console.log("mainContent:", mainContent);

function renderGameboards() {
  // create container for both boards
  const gameboardsContainer = document.createElement("div");
  gameboardsContainer.classList.add("gameboards-container");

  // create individual board containers
  const player1BoardContainer = document.createElement("div");
  player1BoardContainer.classList.add("player-board");
  player1BoardContainer.dataset.player = "0";

  const player2BoardContainer = document.createElement("div");
  player2BoardContainer.classList.add("player-board");
  player2BoardContainer.dataset.player = "1";

  // access gameboard data
  const player1Board = gameData[0].player.gameboard.getBoard();
  const player2Board = gameData[1].player.gameboard.getBoard();

  // helper function to generate grid cells for each board
  function renderSingleBoard(boardData, boardContainer) {
    // loop through rows
    for (let row = 0; row < 10; row++) {
      // loop through columns
      for (let col = 0; col < 10; col++) {
        // create grid cells
        const gridCell = document.createElement("div");
        gridCell.classList.add("grid-cell");

        // set data-x attribute to col
        gridCell.dataset.x = col;
        // set data-y attribute to row
        gridCell.dataset.y = row;
        // get cell content from boardData[row][col]
        const cell = boardData[row][col];

        // determine cell state and add appropriate CSS class
        if (cell === "H") {
          gridCell.classList.add("hit");
        } else if (cell === "M") {
          gridCell.classList.add("miss");
        } else if (cell instanceof Ship) {
          gridCell.classList.add("ship");
        } else if (cell === "X") {
          gridCell.classList.add("empty");
        }
        // append cell to boardContainer
        boardContainer.appendChild(gridCell);
      }
    }
  }

  renderSingleBoard(player1Board, player1BoardContainer);
  renderSingleBoard(player2Board, player2BoardContainer);

  // append boards to container
  gameboardsContainer.appendChild(player1BoardContainer);
  gameboardsContainer.appendChild(player2BoardContainer);
  mainContent.appendChild(gameboardsContainer);
}

renderGameboards();

/* notes:
 * displayController.js imports the reference
 * to that element (ie, main-content) from layout.js
 * and appends its dynamic elements (like gameboards) into that
 */
