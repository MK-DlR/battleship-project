// appController.js
// manages overall app flow, player data, screen transitions

import { mainContent } from "./layout.js";
import { createNewGame, getCurrentGameData } from "./gameController.js";
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
  resetScore(); // reset player scores
  // resetPlayers(); // reset players

  // sync with appState
  const gameData = getCurrentGameData();
  gameData[0].player.name = appState.player1Name;
  gameData[1].player.name = appState.player2Name;
  gameData[0].player.type = appState.player1Type;
  gameData[1].player.type = appState.player2Type;

  showGameScreen(); // render it
}

// new round (same players, keep score)
function handleNewRound() {
  createNewGame(); // create fresh game data

  // sync with appState
  const gameData = getCurrentGameData();
  gameData[0].player.name = appState.player1Name;
  gameData[1].player.name = appState.player2Name;
  gameData[0].player.type = appState.player1Type;
  gameData[1].player.type = appState.player2Type;

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
