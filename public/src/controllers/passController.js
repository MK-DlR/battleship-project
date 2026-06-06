// src/controllers/passController.js

import { mainContent } from "../layout.js";
import { appState, continueFromPassScreen } from "./appController.js";

function renderPassScreen() {
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

export { renderPassScreen };
