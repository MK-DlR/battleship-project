// displayController.js
// renders each players gameboard and ships, etc

import { mainContent } from "./layout.js";

function renderGameboards() {
  const playerBoard = document.createElement("div");
  playerBoard.classList.add("gameboard");
  // build the board squares here...

  // making sure things are properly linked - TEMPORARY
  const message = document.createElement("p");
  message.textContent = "salut from displayController.js";
  playerBoard.appendChild(message);
  // ends here

  mainContent.appendChild(playerBoard);
}

renderGameboards();

/* notes:
 * displayController.js imports the reference
 * to that element (ie, main-content) from layout.js
 * and appends its dynamic elements (like gameboards) into that
 */
