// src/controllers/displayController.js

// imports
import { mainContent } from "../layout.js";

import {
  appState,
  showGameScreen,
  showHomeScreen,
  handleNewGame,
  handleNewRound,
  showPassScreen,
  continueFromPassScreen,
} from "./appController.js";
import {
  renderBattleLog,
  addBattleLogEntry,
  resetBattleLog,
} from "./battleLogController.js";
import {
  getCurrentGameData,
  randomizeShips1,
  randomizeShips2,
  startGame,
  switchPlayerTurn,
  activePlayerIndex,
  getActivePlayer,
  attackOpponentBoard,
  isBothPlayersHuman,
  checkEndgame,
} from "./gameController.js";
import { renderPassScreen } from "./passController.js";

import { Ship } from "../game/ship.js";

import { createBoardWrapper } from "../helpers/domHelpers.js";
import { addNewPlayer1, addNewPlayer2 } from "../helpers/playerSetup.js";
import { shouldHideShips } from "../helpers/visibilityHelpers.js";

let gameContainer;
// let battleLogs = [];

function renderHomescreen() {
  // create home screen elements
  const homeContainer = document.createElement("div");
  homeContainer.classList.add("home-container");

  // create "let's play" text
  const title1 = document.createElement("h1");
  title1.classList.add("title1");
  title1.innerHTML = `Let's play<br>`;

  const title2 = document.createElement("h1");
  title2.classList.add("title2");
  title2.textContent = "BATTLESHIP!!!";

  const gameButtonContainer = document.createElement("div");
  gameButtonContainer.classList.add("home-button-container");

  const playerButtonContainer = document.createElement("div");
  playerButtonContainer.classList.add("player-button-container");

  // create new game button
  const newGameButton = document.createElement("button");
  newGameButton.textContent = "New Game";
  newGameButton.classList.add("dark-button");
  newGameButton.addEventListener("click", handleNewGame);

  // create new player 1 button
  const newPlayerButton1 = document.createElement("button");
  newPlayerButton1.textContent = "Set Player 1";
  newPlayerButton1.classList.add("button");
  newPlayerButton1.addEventListener("click", addNewPlayer1);

  // create new player 2 button
  const newPlayerButton2 = document.createElement("button");
  newPlayerButton2.textContent = "Set Player 2";
  newPlayerButton2.classList.add("button");
  newPlayerButton2.addEventListener("click", addNewPlayer2);

  // create credit link
  const credit = document.createElement("div");
  credit.classList.add("home-credit");
  credit.innerHTML = `<a href="https://github.com/MK-DlR">Created by <i class="fa-brands fa-github"></i> MK-DlR</a>`;

  // append everything
  gameButtonContainer.appendChild(newGameButton);
  playerButtonContainer.appendChild(newPlayerButton1);
  playerButtonContainer.appendChild(newPlayerButton2);
  homeContainer.appendChild(title1);
  homeContainer.appendChild(title2);
  homeContainer.appendChild(gameButtonContainer);
  homeContainer.appendChild(playerButtonContainer);
  homeContainer.appendChild(credit);
  mainContent.appendChild(homeContainer);
}

function renderGameboards() {
  // find and clear previous boards first
  mainContent.querySelector(".gameboards-container")?.remove();

  // get current game data (this will be fresh after createNewGame() is called)
  const gameData = getCurrentGameData();

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
          if (appState.gameStarted === false) {
            alert("Please place ships and press Start Game to play!");
            return;
          }
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

            const coordinates = displayX + displayY;

            // access gameboards
            getCurrentGameData();

            // call the attack
            const result = attackOpponentBoard(x, y);

            if (
              result === "hit" ||
              result === "miss" ||
              (result && result.type === "ship_sunk")
            ) {
              if (result === "hit") {
                // hit battle log call
                addBattleLogEntry(
                  getActivePlayer().player.name,
                  result,
                  coordinates,
                  null,
                  null,
                  activePlayerIndex,
                );
              } else if (result && result.type === "ship_sunk") {
                const gameData = getCurrentGameData();
                const opponentIndex = activePlayerIndex === 0 ? 1 : 0;
                const opponentName = gameData[opponentIndex].player.name;

                // TODO: update to modal
                alert(
                  `${getActivePlayer().player.name} sunk ${opponentName}'s ${
                    result.shipName
                  }!`,
                );

                // ship sunk battle log call
                addBattleLogEntry(
                  getActivePlayer().player.name,
                  result,
                  coordinates,
                  result.shipName,
                  opponentName,
                  activePlayerIndex,
                );
              } else {
                // miss battle log call
                addBattleLogEntry(
                  getActivePlayer().player.name,
                  result,
                  coordinates,
                  null,
                  null,
                  activePlayerIndex,
                );
              }

              if (checkEndgame()) {
                addBattleLogEntry(
                  getActivePlayer().player.name,
                  "game_over",
                  null,
                  null,
                  null,
                  activePlayerIndex,
                );

                // re-render board
                mainContent.innerHTML = "";
                renderGamescreen();

                return;
              }

              // valid attack - switch turns
              switchPlayerTurn();

              // check if pass screen is needed (both players human)
              const gameData = getCurrentGameData();
              if (
                gameData[0].player.type === "human" &&
                gameData[1].player.type === "human"
              ) {
                const nextPlayer = gameData[activePlayerIndex].player;

                // show pass screen instead of immediate re-render
                showPassScreen(nextPlayer.name, activePlayerIndex);
              } else {
                // human vs computer - immediate re-render
                mainContent.innerHTML = "";
                renderGamescreen();
                updateTurn();

                const nextPlayer = getActivePlayer().player;

                if (nextPlayer.type === "computer") {
                  setTimeout(() => {
                    const computerAttack = attackOpponentBoard();

                    if (!computerAttack) {
                      return;
                    }

                    const displayX = String.fromCharCode(65 + computerAttack.x);
                    const displayY = computerAttack.y + 1;

                    const computerResult = computerAttack.result;

                    if (computerResult?.type === "ship_sunk") {
                      const gameData = getCurrentGameData();
                      const opponentIndex = activePlayerIndex === 0 ? 1 : 0;
                      const opponentName = gameData[opponentIndex].player.name;

                      addBattleLogEntry(
                        getActivePlayer().player.name,
                        computerResult,
                        `${displayX}${displayY}`,
                        computerResult.shipName,
                        opponentName,
                        null,
                        activePlayerIndex,
                      );
                    } else {
                      addBattleLogEntry(
                        getActivePlayer().player.name,
                        computerResult,
                        `${displayX}${displayY}`,
                        null,
                        null,
                        activePlayerIndex,
                      );
                    }

                    if (checkEndgame()) {
                      addBattleLogEntry(
                        getActivePlayer().player.name,
                        "game_over",
                        null,
                        null,
                        null,
                        activePlayerIndex,
                      );

                      // re-render board
                      mainContent.innerHTML = "";
                      renderGamescreen();

                      return;
                    }

                    switchPlayerTurn();

                    // re-render after computer finishes
                    mainContent.innerHTML = "";
                    renderGamescreen();
                    updateTurn();
                  }, 500);
                }
              }
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
          if (
            shouldHideShips(boardContainer.dataset.player, activePlayerIndex)
          ) {
            // hide the ship - make it look like an empty cell
            gridCell.classList.add("empty");
          } else {
            // show the ship normally
            gridCell.classList.add("ship");
          }
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

  // create conditional board labels
  const board1Label = document.createElement("div");
  const board2Label = document.createElement("div");
  board1Label.classList.add("board-label");
  board2Label.classList.add("board-label");

  if (
    // check if game is started
    !appState.gameStarted &&
    appState.shipsConfirmed.player1 &&
    !appState.shipsConfirmed.player2 &&
    gameData[1].player.type === "human"
  ) {
    // p2 placement phase - flip the labels
    board1Label.textContent = "Enemy Waters";
    board2Label.textContent = "Your Fleet";
  } else if (
    activePlayerIndex === 0 ||
    gameData[1].player.type === "computer"
  ) {
    board1Label.textContent = "Your Fleet";
    board2Label.textContent = "Enemy Waters";
  } else {
    board1Label.textContent = "Enemy Waters";
    board2Label.textContent = "Your Fleet";
  }

  // append conditional board labels to wrappers
  player1Wrapper.prepend(board1Label);
  player2Wrapper.prepend(board2Label);

  // append boards to container
  gameboardsContainer.appendChild(player1Wrapper);
  gameboardsContainer.appendChild(player2Wrapper);
  gameContainer.appendChild(gameboardsContainer);
}

// ship placement and start game buttons
function renderTempButtons() {
  if (appState.gameStarted === true) {
    return;
  } else {
    const gameData = getCurrentGameData(); // get game info

    // button container
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("temp-button-container");

    gameContainer.appendChild(buttonContainer);

    // PHASE 1: Player 1 setup (always shows first)
    // player 1 randomize ship placement button
    if (appState.shipsConfirmed.player1 === false) {
      const player1Name = gameData[0].player.name;

      const randomizePlacementButton1 = document.createElement("BUTTON");
      randomizePlacementButton1.classList.add("button");
      randomizePlacementButton1.id = "randomizePlacementButton1";

      const randomizePlacementText1 = document.createTextNode(
        `${player1Name} Place Ships`,
      );

      randomizePlacementButton1.addEventListener("click", () => {
        randomizeShips1();
        mainContent.innerHTML = ""; // clear everything first
        renderGamescreen(); // render entire game screen
      });

      randomizePlacementButton1.appendChild(randomizePlacementText1);
      buttonContainer.appendChild(randomizePlacementButton1);
    }

    // player 1 confirm button - shows up AFTER ships are placed
    if (
      appState.shipsPlaced.player1 === true &&
      appState.shipsConfirmed.player1 === false
    ) {
      const confirmButton1 = document.createElement("BUTTON");
      confirmButton1.classList.add("button");
      confirmButton1.textContent = `Confirm Placement`;

      confirmButton1.addEventListener("click", () => {
        appState.shipsConfirmed.player1 = true;

        if (appState.player2Type === "human") {
          // show pass screen
          const gameData = getCurrentGameData();
          showPassScreen(gameData[1].player.name, 1);
        } else {
          mainContent.innerHTML = "";
          renderGamescreen();
        }
      });
      buttonContainer.appendChild(confirmButton1);
    }

    // PHASE 3: start game (only when both confirmed)
    if (appState.shipsConfirmed.player1 && appState.shipsConfirmed.player2) {
      const startGameButton = document.createElement("BUTTON");
      startGameButton.classList.add("button");
      startGameButton.id = "startGameButton";
      const startGameText = document.createTextNode("Start Game");
      startGameButton.addEventListener("click", startGame);
      startGameButton.appendChild(startGameText);
      buttonContainer.appendChild(startGameButton);
    }

    // PHASE 2: Player 2 setup (only after P1 confirmed)
    // player 2 randomize ship placement button
    if (
      appState.shipsConfirmed.player1 === true &&
      appState.shipsConfirmed.player2 === false &&
      appState.player2Type === "human"
    ) {
      const player2Name = gameData[1].player.name;

      const randomizePlacementButton2 = document.createElement("BUTTON");
      randomizePlacementButton2.classList.add("button");
      randomizePlacementButton2.id = "randomizePlacementButton2";

      const randomizePlacementText2 = document.createTextNode(
        `${player2Name} Place Ships`,
      );

      randomizePlacementButton2.addEventListener("click", () => {
        randomizeShips2();
        mainContent.innerHTML = ""; // clear everything first
        renderGamescreen(); // render entire game screen
      });

      randomizePlacementButton2.appendChild(randomizePlacementText2);
      buttonContainer.appendChild(randomizePlacementButton2);
    }

    // player 2 confirm button - shows up AFTER ships are placed
    if (
      appState.shipsConfirmed.player1 === true &&
      appState.shipsPlaced.player2 === true &&
      appState.shipsConfirmed.player2 === false &&
      appState.player2Type === "human"
    ) {
      const confirmButton2 = document.createElement("BUTTON");
      confirmButton2.classList.add("button");
      confirmButton2.textContent = `Confirm Placement`;
      confirmButton2.addEventListener("click", () => {
        appState.shipsConfirmed.player2 = true;
        const gameData = getCurrentGameData();
        showPassScreen(gameData[0].player.name, 0);
      });
      buttonContainer.appendChild(confirmButton2);
    }
  }
}

// new round, home, and reset score buttons
function renderButtons(parent) {
  // button container
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  // new round button
  const newRoundButton = document.createElement("BUTTON");
  newRoundButton.classList.add("dark-button");
  newRoundButton.id = "newRoundButton";
  const newRoundText = document.createTextNode("New Round");
  newRoundButton.addEventListener("click", handleNewRound);

  // home button
  const newGameButton = document.createElement("BUTTON");
  newGameButton.classList.add("dark-button");
  newGameButton.id = "newGameButton";
  const newGameText = document.createTextNode("New Game");
  newGameButton.addEventListener("click", showHomeScreen);

  // reset score button
  const resetScoreButton = document.createElement("BUTTON");
  resetScoreButton.classList.add("dark-button");
  resetScoreButton.id = "resetScoreButton";
  const resetScoreText = document.createTextNode("Reset Score");
  resetScoreButton.addEventListener("click", resetScore);

  // append everything
  parent.appendChild(buttonContainer);
  newRoundButton.appendChild(newRoundText);
  buttonContainer.appendChild(newRoundButton);
  newGameButton.appendChild(newGameText);
  buttonContainer.appendChild(newGameButton);
  resetScoreButton.appendChild(resetScoreText);
  buttonContainer.appendChild(resetScoreButton);
}

// display current scores
function renderScores() {
  const gameData = getCurrentGameData();
  const player1Name = gameData[0].player.name;
  const player2Name = gameData[1].player.name;

  // check if score container already exists
  let mainScoreContainer = document.querySelector(".main-score-container");

  if (!mainScoreContainer) {
    // create new container only if it doesn't exist
    mainScoreContainer = document.createElement("div");
    mainScoreContainer.classList.add("main-score-container");

    // remove the <br> element and just append the container
    gameContainer.appendChild(mainScoreContainer);
  }

  // update p1 score content
  const player1Score = document.createElement("p");
  player1Score.innerHTML = `${player1Name}<br>
  <span style="color:#1B2A4A;">${appState.scores.player1}</span>`;

  // update p2 score content
  const player2Score = document.createElement("p");
  player2Score.innerHTML = `${player2Name}<br>
  <span style="color:#1B2A4A;">${appState.scores.player2}</span>`;

  // clear existing content and append new content
  mainScoreContainer.innerHTML = "";
  mainScoreContainer.appendChild(player1Score);
  mainScoreContainer.appendChild(player2Score);
}

// display current player turn
function renderTurn() {
  const gameData = getCurrentGameData();
  const activePlayer = gameData[activePlayerIndex].player;
  const activeName = activePlayer.name; // get from Player instance

  // create container for turn
  const turnContainer = document.createElement("div");

  turnContainer.classList.add("turn-container");
  turnContainer.innerHTML = `<span style="font-weight: 600">${activeName}'s turn</span>`;

  // append everything
  gameContainer.appendChild(turnContainer);
}

function updateTurn() {
  const gameData = getCurrentGameData();
  const activePlayer = gameData[activePlayerIndex].player;
  const activeName = activePlayer.name; // get from Player instance

  // find container for turn
  const turnContainer = document.querySelector(".turn-container");

  if (!turnContainer) {
    console.warn("Turn container not found");
    return; // exit early if element doesn't exist
  }

  turnContainer.innerHTML = `<span style="font-weight: 600">${activeName}'s turn</span>`;
}

function resetScore() {
  // reset scores in appState
  appState.scores.player1 = 0;
  appState.scores.player2 = 0;

  // only re-render scores if we're currently on the game screen
  if (gameContainer) {
    renderScores();
  }
}

// render full gamescreen
function renderGamescreen() {
  // create full game layout
  const gameLayout = document.createElement("div");
  gameLayout.classList.add("game-layout");

  // create game container
  gameContainer = document.createElement("div");
  gameContainer.classList.add("game-container");

  // create lower panel for media query
  const lowerPanel = document.createElement("div");
  lowerPanel.classList.add("lower-panel");

  // append everything
  mainContent.appendChild(gameLayout);
  renderButtons(gameLayout); // append before gameContainer so it displays on left
  gameLayout.appendChild(gameContainer);

  renderTurn();
  renderGameboards();
  renderTempButtons();
  renderBattleLog(gameLayout);
  renderScores();
}

export {
  renderHomescreen,
  renderGameboards,
  renderButtons,
  renderPassScreen,
  renderScores,
  renderTurn,
  updateTurn,
  resetScore,
  renderGamescreen,
};
