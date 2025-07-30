// appController.js
// manages overall app flow, player data, screen transitions
import { mainContent } from "./layout.js";
import {
  createNewGame,
  getCurrentGameData,
  randomizeShips2,
} from "./gameController.js";
import {
  renderHomescreen,
  renderGamescreen,
  resetScore,
  renderPassScreen,
} from "./displayController.js";

// define app state to track current screen
let appState = {
  currentScreen: "home", // "home", "playing", or "passing"
  player1Name: "Player 1",
  player2Name: "Computer", // set player 2 to computer by default
  player1Type: "human",
  player2Type: "computer", // set player 2 to computer by default
  scores: { player1: 0, player2: 0 },
  shipsPlaced: { player1: false, player2: false },
  shipsConfirmed: { player1: false, player2: false },
  gameStarted: false,
  nextPlayerName: null, // store who should play next
  nextPlayerIndex: null, // store the index of next player
};

// new game (new players, new score)
function handleNewGame() {
  createNewGame(); // create fresh game data
  resetScore(); // reset player scores

  // reset ship placement state for player 1
  appState.shipsPlaced.player1 = false;
  appState.shipsConfirmed.player1 = false;
  appState.gameStarted = false;

  // Get the current game data to check player types
  const gameData = getCurrentGameData();

  // if player 2 is computer, auto-place and confirm their ships
  if (gameData[1].player.type === "computer") {
    randomizeShips2();
    appState.shipsPlaced.player2 = true;
    appState.shipsConfirmed.player2 = true;
  } else {
    // reset player 2 state for human vs human
    appState.shipsPlaced.player2 = false;
    appState.shipsConfirmed.player2 = false;
  }

  showGameScreen(); // render it
}

// new round (same players, keep score)
function handleNewRound() {
  createNewGame(); // create fresh game data

  // reset ship placement state for player 1
  appState.shipsPlaced.player1 = false;
  appState.shipsConfirmed.player1 = false;
  appState.gameStarted = false;

  // get the current game data to check player types
  const gameData = getCurrentGameData();

  // if player 2 is computer, auto-place and confirm their ships
  if (gameData[1].player.type === "computer") {
    randomizeShips2();
    appState.shipsPlaced.player2 = true;
    appState.shipsConfirmed.player2 = true;
  } else {
    // reset player 2 state for human vs human
    appState.shipsPlaced.player2 = false;
    appState.shipsConfirmed.player2 = false;
  }

  showGameScreen(); // render it
}

// reset player names and types
function resetPlayers() {
  appState.player1Name = "Player 1";
  appState.player2Name = "Computer";
  appState.player1Type = "human";
  appState.player2Type = "computer";
}

// screen management functions
function clearMainContent() {
  mainContent.innerHTML = "";
}

function showHomeScreen() {
  appState.currentScreen = "home";
  resetPlayers(); // reset players
  clearMainContent();
  renderHomescreen();
}

function showGameScreen() {
  appState.currentScreen = "playing";
  clearMainContent();
  renderGamescreen();
}

// initialize app
function initApp() {
  // create initial game data first
  createNewGame();

  // auto-place computer ships if default setup
  const gameData = getCurrentGameData();
  if (gameData[1].player.type === "computer") {
    randomizeShips2();
    appState.shipsPlaced.player2 = true;
    appState.shipsConfirmed.player2 = true;
  }

  // then show the game screen
  showGameScreen(); // temporarily start on game screen instead of home
  // showHomeScreen(); // start on home screen instead of immediately showing game
}

// pass device screen
function showPassScreen(nextPlayerName, nextPlayerIndex) {
  appState.currentScreen = "passing";
  appState.nextPlayerName = nextPlayerName;
  appState.nextPlayerIndex = nextPlayerIndex;
  clearMainContent();
  renderPassScreen();
}

// continue from pass device screen
function continueFromPassScreen() {
  appState.currentScreen = "playing";
  appState.nextPlayerName = null;
  appState.nextPlayerIndex = null;
  clearMainContent();
  renderGamescreen();
}

initApp();

export {
  appState,
  handleNewGame,
  handleNewRound,
  showHomeScreen,
  showGameScreen,
  showPassScreen,
  continueFromPassScreen,
};
