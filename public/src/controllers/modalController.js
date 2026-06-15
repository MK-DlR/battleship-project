// src/controllers/modalController.js

function createModal() {
  // create modal overlay
  const modalOverlay = document.createElement("div");
  modalOverlay.id = "modal-overlay";
  // modalOverlay.classList.add("modal-overlay");
  modalOverlay.style.display = "none"; // hidden by default

  // create modal box
  const modalBox = document.createElement("div");
  modalBox.classList.add("modal-box");

  // create modal title
  const modalTitle = document.createElement("div");
  modalTitle.textContent = "Title Placeholder";
  modalTitle.id = "modal-title";
  // modalTitle.classList.add("modal-title");

  // create modal message
  const modalMessage = document.createElement("div");
  modalMessage.textContent = "Message Placeholder";
  modalMessage.id = "modal-message";
  // modalMessage.classList.add("modal-message");

  // create modal input
  const modalInput = document.createElement("input");
  modalInput.id = "modal-input";
  // modalInput.classList.add("modal-input");

  // create modal buttons container
  const modalButtons = document.createElement("div");
  modalButtons.classList.add("modal-buttons");

  // create confirm and cancel buttons
  const modalConfirm = document.createElement("button");
  modalConfirm.textContent = "Confirm";
  modalConfirm.id = "modal-confirm";
  modalConfirm.classList.add("dark-button");

  const modalCancel = document.createElement("button");
  modalCancel.textContent = "Cancel";
  modalCancel.id = "modal-cancel";
  modalCancel.classList.add("button");

  // append buttons to modalButtons first
  modalButtons.appendChild(modalConfirm);
  modalButtons.appendChild(modalCancel);

  // append everything
  modalOverlay.appendChild(modalBox);
  modalBox.appendChild(modalTitle);
  modalBox.appendChild(modalMessage);
  modalBox.appendChild(modalInput);
  modalBox.appendChild(modalButtons);
  document.body.appendChild(modalOverlay);
}

export { createModal };
