// src/helpers/turnHelpers.js

import { appState } from "../controllers/appController.js";
import {
  activePlayerIndex,
  getIsGameOver,
} from "../controllers/gameController.js";

function getTurnText(gameData) {
  // check placement phase
  if (
    !appState.gameStarted &&
    appState.shipsConfirmed.player1 &&
    !appState.shipsConfirmed.player2 &&
    appState.player2Type === "human"
  ) {
    return { text: `${gameData[1].player.name}'s turn`, isWinner: false };
  } else if (!appState.gameStarted && !appState.shipsConfirmed.player1) {
    return { text: `${gameData[0].player.name}'s turn`, isWinner: false };
  } else if (getIsGameOver()) {
    const activeName = gameData[activePlayerIndex].player.name;
    return { text: `${activeName} wins!`, isWinner: true };
  } else {
    const activeName = gameData[activePlayerIndex].player.name;
    return { text: `${activeName}'s turn`, isWinner: false };
  }
}

export { getTurnText };
