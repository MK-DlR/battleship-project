// displayController.js
// renders each players gameboard and ships, ui, etc
// handle both home and game screens based on app state

import { mainContent } from "./layout.js";
import { Ship } from "./game/ship.js";
import {
  getCurrentGameData,
  switchPlayerTurn,
  activePlayerIndex,
  getActivePlayer,
  attackOpponentBoard,
} from "./gameController.js";
import {
  appState,
  showGameScreen,
  showHomeScreen,
  handleNewGame,
  handleNewRound,
} from "./appController.js";

function renderHomescreen() {
  // create home screen elements
  const homeContainer = document.createElement("div");
  homeContainer.classList.add("home-container");

  const title = document.createElement("h1");
  title.textContent = "Let's Play Battleship";

  const gameButtonContainer = document.createElement("div");
  gameButtonContainer.classList.add("button-container");

  const playerButtonContainer = document.createElement("div");
  playerButtonContainer.classList.add("button-container");

  // new game button
  const newGameButton = document.createElement("button");
  newGameButton.textContent = "New Game";
  newGameButton.classList.add("button");
  newGameButton.addEventListener("click", handleNewGame);

  // new player 1 button
  const newPlayerButton1 = document.createElement("button");
  newPlayerButton1.textContent = "New Player 1";
  newPlayerButton1.classList.add("button");
  newPlayerButton1.addEventListener("click", addNewPlayer1);

  // new player 2 button
  const newPlayerButton2 = document.createElement("button");
  newPlayerButton2.textContent = "New Player 2";
  newPlayerButton2.classList.add("button");
  newPlayerButton2.addEventListener("click", addNewPlayer2);

  gameButtonContainer.appendChild(newGameButton);
  playerButtonContainer.appendChild(newPlayerButton1);
  playerButtonContainer.appendChild(newPlayerButton2);
  homeContainer.appendChild(title);
  homeContainer.appendChild(gameButtonContainer);
  homeContainer.appendChild(playerButtonContainer);
  mainContent.appendChild(homeContainer);
}

function renderGameboards() {
  // get current game data (this will be fresh after createNewGame() is called)
  const gameData = getCurrentGameData();

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

    // create column labels container
    const colLabels = document.createElement("div");
    colLabels.classList.add("column-labels");
    colLabels.style.display = "grid";

    // add empty corner cell
    const cornerCell = document.createElement("div");
    cornerCell.classList.add("corner-cell");
    colLabels.appendChild(cornerCell);

    // add letters A-J as column labels
    for (let i = 0; i < 10; i++) {
      const label = document.createElement("div");
      label.textContent = String.fromCharCode(65 + i);
      label.classList.add("label");
      colLabels.appendChild(label);
    }

    // create a container for row labels + board, side by side
    const boardRow = document.createElement("div");
    boardRow.style.display = "flex";

    // create row labels container
    const rowLabels = document.createElement("div");
    rowLabels.classList.add("row-labels");
    rowLabels.style.display = "grid";
    rowLabels.style.marginRight = "2px";

    for (let i = 1; i <= 10; i++) {
      const label = document.createElement("div");
      label.textContent = i;
      label.classList.add("label");
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

  // access gameboard data using current game data
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

        // make grid cells clickable
        gridCell.addEventListener("click", (event) => {
          if (
            (activePlayerIndex === 0 &&
              boardContainer.dataset.player === "1") ||
            (activePlayerIndex === 1 && boardContainer.dataset.player === "0")
          ) {
            // extract x and y from the clicked element's dataset
            const x = parseInt(gridCell.dataset.x);
            const y = parseInt(gridCell.dataset.y);
            // convert to display format for logging
            const displayX = String.fromCharCode(65 + x);
            const displayY = y + 1;
            // log the coordinates and board
            console.log(
              `Cell clicked at: ${displayX}${displayY} on Board ${boardContainer.dataset.player}.`
            );
            // access gameboards
            getCurrentGameData();
            // call the attack
            const result = attackOpponentBoard(x, y);
            if (result === "hit" || result === "miss") {
              // valid attack - re-render boards and switch turns
              switchPlayerTurn();
              // clear everything and re-render the entire game screen
              mainContent.innerHTML = "";
              renderGamescreen();
              // update turn display
              updateTurn();
            } else {
              // invalid attack
              console.log(result); // show error message
            }
          } else {
            console.log("Please select the enemy board to attack");
            return;
          }
        });

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

function renderButtons() {
  // button container
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  // new round button
  const newRoundButton = document.createElement("BUTTON");
  newRoundButton.classList.add("button");
  newRoundButton.id = "newGameButton";
  const newRoundText = document.createTextNode("New Round");
  newRoundButton.addEventListener("click", handleNewRound);

  // home button
  const homeButton = document.createElement("BUTTON");
  homeButton.classList.add("button");
  homeButton.id = "homeButton";
  const homeText = document.createTextNode("Home");
  homeButton.addEventListener("click", showHomeScreen);

  // reset score button
  const resetScoreButton = document.createElement("BUTTON");
  resetScoreButton.classList.add("button");
  resetScoreButton.id = "resetScoreButton";
  const resetScoreText = document.createTextNode("Reset Score");

  // add event listener to call resetScore function
  // need to write resetScore function
  // resetScoreButton.addEventListener("click", resetScore);

  // append everything to DOM
  mainContent.appendChild(buttonContainer);
  newRoundButton.appendChild(newRoundText);
  buttonContainer.appendChild(newRoundButton);
  homeButton.appendChild(homeText);
  buttonContainer.appendChild(homeButton);
  resetScoreButton.appendChild(resetScoreText);
  buttonContainer.appendChild(resetScoreButton);
}

// display current scores
function renderScores() {
  const gameData = getCurrentGameData();
  const player1Name = gameData[0].player.name; // Get from Player instance
  const player2Name = gameData[1].player.name; // Get from Player instance

  // create container for scores
  const mainScoreContainer = document.createElement("div");
  mainScoreContainer.classList.add("main-score-container");

  const playerScores = document.createElement("p");
  playerScores.innerHTML = `<h3>Player Scores</h3><br>
  <b>${player1Name}:</b> ${appState.scores.player1} <font size="5">|</font> <b>${player2Name}:</b> ${appState.scores.player2}`;
  mainContent.appendChild(document.createElement("br"));
  mainContent.appendChild(mainScoreContainer);
  mainScoreContainer.appendChild(playerScores);
}

// display current player turn
function renderTurn() {
  const gameData = getCurrentGameData();
  const activePlayer = gameData[activePlayerIndex].player;
  const activeName = activePlayer.name; // Get from Player instance

  // create container for turn
  const turnContainer = document.createElement("div");
  turnContainer.classList.add("turn-container");
  turnContainer.innerHTML = `<b>${activeName}'s</b> turn...`;
  mainContent.appendChild(turnContainer);
}

function updateTurn() {
  const gameData = getCurrentGameData();
  const activePlayer = gameData[activePlayerIndex].player;
  const activeName = activePlayer.name; // Get from Player instance

  const turnContainer = document.querySelector(".turn-container");
  if (!turnContainer) {
    console.warn("Turn container not found");
    return; // exit early if element doesn't exist
  }

  turnContainer.innerHTML = `<b>${activeName}'s</b> turn...`;
}

function addNewPlayer1() {
  let newPlayer = prompt("Enter player name");

  // handle case where user cancels the prompt
  if (newPlayer === null) {
    return;
  }

  const playerName = newPlayer;

  // update appState
  appState.player1Name = playerName;

  console.log(`Stored player 1: ${playerName}`);
}

function addNewPlayer2() {
  let newPlayer = prompt("Enter player name");

  // handle case where user cancels the prompt
  if (newPlayer === null) {
    return;
  }

  const playerName = newPlayer;

  // update appState
  appState.player2Name = playerName;

  console.log(`Stored player 1: ${playerName}`);
}

function renderGamescreen() {
  renderTurn();
  renderGameboards();
  renderButtons();
  renderScores();
}

export {
  renderHomescreen,
  renderGameboards,
  renderButtons,
  renderScores,
  renderTurn,
  updateTurn,
  renderGamescreen,
};
