// src/helpers/visibilityHelpers.js

import { appState } from "../controllers/appController.js";

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

export { addNewPlayer1, addNewPlayer2 };
