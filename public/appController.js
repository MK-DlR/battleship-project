// appController.js
// manages overall app flow, player data, screen transitions

import { mainContent } from "./layout.js";
import { createNewGame } from "./gameController.js";
import { renderHomescreen, renderGamescreen } from "./displayController.js";

// define app state to track current screen
let appState = {
  currentScreen: "home", // "home" or "playing"
  player1Name: "Player 1",
  player2Name: "Player 2",
  scores: { player1: 0, player2: 0 },
};

// create fresh game data, transition to game screen, and render
function handleNewGame() {
  createNewGame(); // This creates fresh game data
  showGameScreen(); // This renders it
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
  showGameScreen(); // temporarily start on game screen instead of home
  // showHomeScreen(); // start on home screen instead of immediately showing game
}

initApp();

export { appState, handleNewGame, showHomeScreen, showGameScreen };
