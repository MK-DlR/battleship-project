// src/helpers/visibilityHelpers.js

import { appState } from "../controllers/appController.js";
import { showInputModal } from "../controllers/modalController.js";

function addNewPlayer1() {
  showInputModal(
    "Enter player name",
    (value) => {
      appState.player1Name = value;
      appState.player1Type = "human";
      console.log(`Stored player 1: ${value}`);
    },
    () => {
      return;
    },
  );
}

function addNewPlayer2() {
  showInputModal(
    "Enter player name",
    (value) => {
      appState.player2Name = value;
      appState.player2Type = "human";
      console.log(`Stored player 2: ${value}`);
    },
    () => {
      return;
    },
  );
}

export { addNewPlayer1, addNewPlayer2 };
