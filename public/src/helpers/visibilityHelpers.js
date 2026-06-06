// src/helpers/visibilityHelpers.js

import { appState } from "../controllers/appController.js";
import { getCurrentGameData } from "../controllers/gameController.js";

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

export { shouldHideShips };
