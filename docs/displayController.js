// displayController.js
// renders each players gameboard and ships, ui, etc
// handle both home and game screens based on app state

import { mainContent } from "./layout.js";
import { Ship } from "./game/ship.js";
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
} from "./gameController.js";
import {
  appState,
  showGameScreen,
  showHomeScreen,
  handleNewGame,
  handleNewRound,
  showPassScreen,
  continueFromPassScreen,
} from "./appController.js";

let gameContainer;

function renderHomescreen() {
  // create home screen elements
  const homeContainer = document.createElement("div");
  homeContainer.classList.add("home-container");

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

  // new game button
  const newGameButton = document.createElement("button");
  newGameButton.textContent = "New Game";
  newGameButton.classList.add("dark-button");
  newGameButton.addEventListener("click", handleNewGame);

  // new player 1 button
  const newPlayerButton1 = document.createElement("button");
  newPlayerButton1.textContent = "Set Player 1";
  newPlayerButton1.classList.add("button");
  newPlayerButton1.addEventListener("click", addNewPlayer1);

  // new player 2 button
  const newPlayerButton2 = document.createElement("button");
  newPlayerButton2.textContent = "Set Player 2";
  newPlayerButton2.classList.add("button");
  newPlayerButton2.addEventListener("click", addNewPlayer2);

  gameButtonContainer.appendChild(newGameButton);
  playerButtonContainer.appendChild(newPlayerButton1);
  playerButtonContainer.appendChild(newPlayerButton2);
  homeContainer.appendChild(title1);
  homeContainer.appendChild(title2);
  homeContainer.appendChild(gameButtonContainer);
  homeContainer.appendChild(playerButtonContainer);
  mainContent.appendChild(homeContainer);
}

function renderGameboards() {
  // clear previous boards first
  mainContent.querySelector(".gameboards-container")?.remove();

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
            // log the coordinates and board
            console.log(
              `Cell clicked at: ${displayX}${displayY} on Board ${boardContainer.dataset.player}.`
            );
            // access gameboards
            getCurrentGameData();
            // call the attack
            const result = attackOpponentBoard(x, y);

            if (
              result === "hit" ||
              result === "miss" ||
              (result && result.type === "ship_sunk")
            ) {
              if (result && result.type === "ship_sunk") {
                const gameData = getCurrentGameData();
                const opponentIndex = activePlayerIndex === 0 ? 1 : 0;
                const opponentName = gameData[opponentIndex].player.name;

                // handle ship sunk notification
                console.log(`Ship sunk: ${result.shipName}`);
                alert(
                  `${getActivePlayer().player.name} sunk ${opponentName}'s ${
                    result.shipName
                  }!`
                );
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
                    const computerResult = attackOpponentBoard();
                    console.log(`Computer move: ${computerResult}`);
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

  function shouldHideShips(boardPlayerIndex, activePlayerIndex) {
    const boardIndex = parseInt(boardPlayerIndex);
    const gameData = getCurrentGameData();

    // get player types
    const player1Type = gameData[0].player.type;
    const player2Type = gameData[1].player.type;

    // DURING SHIP PLACEMENT PHASE (before game starts)
    if (!appState.gameStarted) {
      // human vs human placement phase
      if (player1Type === "human" && player2Type === "human") {
        // P1 placement phase: show P1 ships, hide P2 ships
        if (!appState.shipsConfirmed.player1) {
          return boardIndex === 1; // hide P2 board (index 1)
        }
        // P2 placement phase: hide P1 ships, show P2 ships
        else if (
          appState.shipsConfirmed.player1 &&
          !appState.shipsConfirmed.player2
        ) {
          return boardIndex === 0; // hide P1 board (index 0)
        }
        // both confirmed: hide both until game is started
        else {
          return true;
        }
      }

      // human vs computer placement phase
      if (
        (player1Type === "human" && player2Type === "computer") ||
        (player1Type === "computer" && player2Type === "human")
      ) {
        // always hide computer ships, show human ships during placement
        const humanPlayerIndex = player1Type === "human" ? 0 : 1;
        return boardIndex !== humanPlayerIndex;
      }
    }

    // DURING ACTUAL GAMEPLAY (after game starts)
    else {
      // human vs computer gameplay: always hide computer ships
      if (
        (player1Type === "human" && player2Type === "computer") ||
        (player1Type === "computer" && player2Type === "human")
      ) {
        const humanPlayerIndex = player1Type === "human" ? 0 : 1;
        return boardIndex !== humanPlayerIndex;
      }

      // human vs human gameplay: hide opponent's ships
      if (player1Type === "human" && player2Type === "human") {
        return boardIndex !== activePlayerIndex;
      }
    }

    // default fallback
    return boardIndex !== activePlayerIndex;
  }

  renderSingleBoard(player1Board, player1BoardContainer);
  renderSingleBoard(player2Board, player2BoardContainer);

  const player1Wrapper = createBoardWrapper(player1BoardContainer);
  const player2Wrapper = createBoardWrapper(player2BoardContainer);

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
    // button container
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("temp-button-container");

    gameContainer.appendChild(buttonContainer);

    // PHASE 1: Player 1 setup (always shows first)
    // player 1 randomize ship placement button
    if (appState.shipsConfirmed.player1 === false) {
      const randomizePlacementButton1 = document.createElement("BUTTON");
      randomizePlacementButton1.classList.add("button");
      randomizePlacementButton1.id = "randomizePlacementButton1";
      const randomizePlacementText1 = document.createTextNode("P1 Place Ships");
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
      confirmButton1.textContent = "Confirm P1 Ships";
      confirmButton1.addEventListener("click", () => {
        appState.shipsConfirmed.player1 = true;

        if (appState.player2Type === "human") {
          // show pass screen instead of just an alert
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
      const randomizePlacementButton2 = document.createElement("BUTTON");
      randomizePlacementButton2.classList.add("button");
      randomizePlacementButton2.id = "randomizePlacementButton2";
      const randomizePlacementText2 = document.createTextNode("P2 Place Ships");
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
      confirmButton2.textContent = "Confirm P2 Ships";
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
function renderButtons() {
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

  // append everything to DOM
  mainContent.appendChild(buttonContainer);
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

    // Remove the <br> element and just append the container
    gameContainer.appendChild(mainScoreContainer);
  }

  // update content
  const player1Score = document.createElement("p");
  player1Score.innerHTML = `<b>${player1Name}<br>
  <span style="color:#294163;">${appState.scores.player1}</span></b>`;

  // update content
  const player2Score = document.createElement("p");
  player2Score.innerHTML = `<b>${player2Name}<br>
  <span style="color:#294163;">${appState.scores.player2}</span></b>`;

  // clear existing content and add new content
  mainScoreContainer.innerHTML = "";
  mainScoreContainer.appendChild(player1Score);
  mainScoreContainer.appendChild(player2Score);
}

function renderPassScreen() {
  // add CSS styles to the document head if not already present
  if (!document.querySelector("#pass-screen-styles")) {
    const style = document.createElement("style");
    style.id = "pass-screen-styles";
    style.textContent = `
      body {
        background-color: #D10F0D;
      }
      .container {
        width: 40px;
        margin: 70px auto;
      }
      .dot {
        width: 20px;
        height: 20px;
        margin: 7px;
        display: inline-block;
        border-radius: 100%;
      }
      .dot1 {
        background-color: #D10F0D;
        animation: jump-up 0.6s 0.1s linear infinite;
      }
      .dot2 {
        background-color: #53829C;
        animation: jump-up 0.6s 0.2s linear infinite;
      }
      .dot3 {
        background-color: #294163;
        animation: jump-up 0.6s 0.3s linear infinite;
      }
      @keyframes jump-up{
        50%{
          transform: translate(0,15px);
        }
      }
    `;
    document.head.appendChild(style);
  }

  const passContainer = document.createElement("div");
  passContainer.classList.add("pass-container");

  const title = document.createElement("h2");
  title.classList.add("pass-title");
  title.textContent = "Pass the device to";

  const playerName = document.createElement("div");
  playerName.classList.add("player-name");
  playerName.textContent = appState.nextPlayerName;

  // create animated loading dots
  const loadingContainer = document.createElement("div");
  loadingContainer.classList.add("loading-container");

  const dot1 = document.createElement("div");
  dot1.classList.add("dot", "dot1");

  const dot2 = document.createElement("div");
  dot2.classList.add("dot", "dot2");

  const dot3 = document.createElement("div");
  dot3.classList.add("dot", "dot3");

  loadingContainer.appendChild(dot1);
  loadingContainer.appendChild(dot2);
  loadingContainer.appendChild(dot3);

  const continueButton = document.createElement("button");
  continueButton.textContent = "Continue Game";
  continueButton.classList.add("button", "continue-button");
  continueButton.addEventListener("click", continueFromPassScreen);

  // assemble everything
  passContainer.appendChild(title);
  passContainer.appendChild(playerName);
  passContainer.appendChild(loadingContainer);
  passContainer.appendChild(continueButton);

  mainContent.appendChild(passContainer);
}

// display current player turn
function renderTurn() {
  const gameData = getCurrentGameData();
  const activePlayer = gameData[activePlayerIndex].player;
  const activeName = activePlayer.name; // get from Player instance

  // create container for turn
  const turnContainer = document.createElement("div");
  turnContainer.classList.add("turn-container");
  turnContainer.innerHTML = `<b>${activeName}'s</b> turn...`;
  gameContainer.appendChild(turnContainer);
}

function updateTurn() {
  const gameData = getCurrentGameData();
  const activePlayer = gameData[activePlayerIndex].player;
  const activeName = activePlayer.name; // get from Player instance

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
  appState.player1Type = "human";

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
  appState.player2Type = "human";

  console.log(`Stored player 2: ${playerName}`);
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

function renderGamescreen() {
  gameContainer = document.createElement("div");
  gameContainer.classList.add("game-container");

  mainContent.appendChild(gameContainer);

  renderTurn();
  renderGameboards();
  renderTempButtons();
  renderButtons();
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
  renderGamescreen,
  resetScore,
};
0;
