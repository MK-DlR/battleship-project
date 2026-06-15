// src/controllers/modalController.js

function createModal() {
  // create modal overlay
  const modalOverlay = document.createElement("div");
  modalOverlay.classList.add("modal-overlay");
  modalOverlay.style.display = "none"; // hidden by default

  // create modal box
  const modalBox = document.createElement("div");
  modalBox.classList.add("modal-box");

  // create modal title
  const modalTitle = document.createElement("div");
  modalTitle.classList.add("modal-title");

  // create modal message
  const modalMessage = document.createElement("div");
  modalMessage.classList.add("modal-message");

  // create modal input
  const modalInput = document.createElement("INPUT");
  modalInput.classList.add("modal-input");

  // create modal buttons container
  const modalButtons = document.createElement("div");
  modalButtons.classList.add("modal-buttons");

  // create confirm and cancel buttons
  const confirmButton = document.createElement("BUTTON");
  confirmButton.textContent = "Confirm";
  confirmButton.classList.add("dark-button");

  const cancelButton = document.createElement("BUTTON");
  cancelButton.textContent = "Cancel";
  cancelButton.classList.add("button");

  // append buttons to modalButtons first
  modalButtons.appendChild(confirmButton);
  modalButtons.appendChild(cancelButton);

  // append everything
  modalOverlay.appendChild(modalBox);
  modalBox.appendChild(modalTitle);
  modalBox.appendChild(modalMessage);
  modalBox.appendChild(modalInput);
  modalBox.appendChild(modalButtons);
  document.body.appendChild(modalOverlay);
}

export { createModal };
