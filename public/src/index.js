// src/index.js

console.log("INDEX LOADED");

import "./layout.js"; // creates the basic DOM structure
import "./controllers/appController.js"; // sets up app state, creates the coordination layer
import "./controllers/gameController.js"; // game logic loads
import "./controllers/displayController.js"; // rendering logic loads last
