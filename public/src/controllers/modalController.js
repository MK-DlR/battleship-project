// src/controllers/modalController.js

import {
  getModalElements,
  hideModal,
  showModal,
} from "../helpers/modalHelpers.js";

// basic modal
function createModal() {
  // create modal overlay
  const modalOverlay = document.createElement("div");
  modalOverlay.id = "modal-overlay";
  modalOverlay.style.display = "none"; // hidden by default

  // create modal box
  const modalBox = document.createElement("div");
  modalBox.classList.add("modal-box");

  // create modal title
  const modalTitle = document.createElement("div");
  modalTitle.id = "modal-title";

  // create modal message
  const modalMessage = document.createElement("div");
  modalMessage.id = "modal-message";

  // create modal input
  const modalInput = document.createElement("input");
  modalInput.id = "modal-input";

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

function showInputModal(title, onConfirm, onCancel) {
  // get elements by id
  const {
    title: modalTitle,
    message,
    input,
    confirm: confirmBtn,
    cancel,
  } = getModalElements();

  // set title text
  modalTitle.textContent = title;

  // clear and show input field
  input.style.display = "block";
  input.value = "";

  // hide message div
  message.style.display = "none";

  // show overlay
  showModal();

  // clone confirm button
  const newConfirm = confirmBtn.cloneNode(true);
  confirmBtn.parentNode.replaceChild(newConfirm, confirmBtn);

  newConfirm.addEventListener("click", () => {
    const value = input.value.trim();
    hideModal();
    onConfirm(value);
  });

  // clone cancel button
  const newCancel = cancel.cloneNode(true);
  cancel.parentNode.replaceChild(newCancel, cancel);

  newCancel.addEventListener("click", () => {
    hideModal();
    if (onCancel) onCancel();
  });

  // focus input field so user can type immediately
  document.getElementById("modal-input").focus();
}

/*
function showAlertModal(title, message, onConfirm) {
  // get elements by id
  const {
    title: titleElement,
    message,
    input,
    confirm: confirmBtn,
    cancel,
  } = getModalElements();

  // set title and message text

  input.style.display = "none"; // hide input field

  // show message div
  // set confirm button text to ok

  cancel.style.display = "none"; // hide cancel button

  // show overlay

  // set up confirm button click handler
  // hide overlay, call onConfirm() if provided
  const newConfirm = confirmBtn.cloneNode(true);
  confirmBtn.parentNode.replaceChild(newConfirm, confirmBtn);
}
*/

export { createModal, showInputModal /* showAlertModal */ };
