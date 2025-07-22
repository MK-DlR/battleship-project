// layout.js
// static page setup (header, footer, initial structure, styling setup)

// layout.js
const container = document.getElementById("container");

// create main content container
const mainContent = document.createElement("main");
mainContent.id = "main-content";
container.appendChild(mainContent);

// making sure things are properly linked - TEMPORARY
const debugMessage = document.createElement("p");
debugMessage.textContent = "bonjour from layout.js";
container.appendChild(debugMessage);
// ends here

// export mainContent so others can append inside it
export { mainContent };

/* notes:
 * layout.js creates the static layout elements
 * and appends them to the DOM
 * for example, it might create a <main id="main-content">
 * inside the container div
 *
 * layout.js exports references to key elements it created
 * like the main-content element
 * so other modules can use them
 */
