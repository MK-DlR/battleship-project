// layout.js
// static page setup (header, footer, initial structure, styling setup)

// layout.js
const container = document.getElementById("container");

// create main content container
const mainContent = document.createElement("main");
mainContent.id = "main-content";

container.appendChild(mainContent);

// export mainContent so others can append inside it
export { mainContent };
