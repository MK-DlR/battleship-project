// displayController.js
// renders each players gameboard and ships, ui, etc

import { mainContent } from "./layout.js";
import { Ship } from "./game/ship.js";
import { gameData } from "./gameController.js"; // import the game state

function renderGameboards() {
  // create container for both boards
  const gameboardsContainer = document.createElement("div");
  gameboardsContainer.classList.add("gameboards-container");

  // create wrappers for both boards
  const boardWrapper1 = document.createElement("div");
  boardWrapper1.classList.add("board-wrapper");
  const boardWrapper2 = document.createElement("div");
  boardWrapper2.classList.add("board-wrapper");

  // create labels for both boards
  const columnLabels = document.createElement("div");
  columnLabels.classList.add("column-labels");
  const rowLabels = document.createElement("div");
  rowLabels.classList.add("row-labels");

  function createBoardWrapper(boardContainer) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("board-wrapper");

    // create column labels container with a top-left empty cell
    const colLabels = document.createElement("div");
    colLabels.classList.add("column-labels");
    colLabels.style.display = "grid";
    colLabels.style.gridTemplateColumns = `30px repeat(10, 30px)`;

    // add empty corner cell
    const cornerCell = document.createElement("div");
    cornerCell.style.width = "30px";
    cornerCell.style.height = "30px";
    colLabels.appendChild(cornerCell);

    // add letters A-J as column labels
    for (let i = 0; i < 10; i++) {
      const label = document.createElement("div");
      label.textContent = String.fromCharCode(65 + i);
      label.style.width = "30px";
      label.style.height = "30px";
      label.style.textAlign = "center";
      colLabels.appendChild(label);
    }

    // create a container for row labels + board, side by side
    const boardRow = document.createElement("div");
    boardRow.style.display = "flex";

    // create row labels container
    const rowLabels = document.createElement("div");
    rowLabels.classList.add("row-labels");
    rowLabels.style.display = "grid";
    rowLabels.style.gridTemplateRows = `repeat(10, 30px)`;
    rowLabels.style.marginRight = "2px"; // gap between row labels and board

    for (let i = 1; i <= 10; i++) {
      const label = document.createElement("div");
      label.textContent = i;
      label.style.width = "30px";
      label.style.height = "30px";
      label.style.lineHeight = "30px";
      label.style.textAlign = "center";
      rowLabels.appendChild(label);
    }

    boardRow.appendChild(rowLabels);
    boardRow.appendChild(boardContainer);

    wrapper.appendChild(colLabels);
    wrapper.appendChild(boardRow);

    return wrapper;
  }

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

  const player1Wrapper = createBoardWrapper(player1BoardContainer);
  const player2Wrapper = createBoardWrapper(player2BoardContainer);

  // append boards to container
  gameboardsContainer.appendChild(player1Wrapper);
  gameboardsContainer.appendChild(player2Wrapper);
  mainContent.appendChild(gameboardsContainer);
}

renderGameboards();

export { renderGameboards };

/* notes:
 * displayController.js imports the reference
 * to that element (ie, main-content) from layout.js
 * and appends its dynamic elements (like gameboards) into that
 */
