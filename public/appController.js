// appController.js
// manages overall app flow, player data, screen transitions

import { mainContent } from "./layout.js";
import { createNewGame } from "./gameController.js";
import {
  renderHomescreen,
  renderGamescreen,
  resetScore,
} from "./displayController.js";

// define app state to track current screen
let appState = {
  currentScreen: "home", // "home" or "playing"
  player1Name: "Player 1",
  player2Name: "Computer", // set player 2 to computer by default
  player1Type: "human",
  player2Type: "computer", // set player 2 to computer by default
  scores: { player1: 0, player2: 0 },
};

// new game (new players, new score)
function handleNewGame() {
  createNewGame(); // create fresh game data
  resetScore();
  showGameScreen(); // render it
}

// new round (same players, keep score)
function handleNewRound() {
  createNewGame(); // create fresh game data
  showGameScreen(); // render it
}

// screen management functions
function clearMainContent() {
  mainContent.innerHTML = "";
}

function showHomeScreen() {
  appState.currentScreen = "home";
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
  // then show the game screen
  showGameScreen(); // temporarily start on game screen instead of home
  // showHomeScreen(); // start on home screen instead of immediately showing game
}

initApp();

export {
  appState,
  handleNewGame,
  handleNewRound,
  showHomeScreen,
  showGameScreen,
};
