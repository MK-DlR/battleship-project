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

  modalTitle.textContent = title; // set title text

  // clear and show input field
  input.style.display = "block";
  input.value = "";

  message.style.display = "none"; // hide message div

  cancel.style.display = "block"; // show cancel button

  showModal(); // show overlay

  // clone and replace input element
  const newInput = input.cloneNode(true);
  input.parentNode.replaceChild(newInput, input);

  newInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const value = newInput.value.trim();
      hideModal();
      onConfirm(value);
    }
  });

  // clone and replace confirm button
  const newConfirm = confirmBtn.cloneNode(true);
  confirmBtn.parentNode.replaceChild(newConfirm, confirmBtn);

  newConfirm.addEventListener("click", () => {
    const value = newInput.value.trim();
    hideModal();
    onConfirm(value);
  });

  // clone and replace cancel button
  const newCancel = cancel.cloneNode(true);
  cancel.parentNode.replaceChild(newCancel, cancel);

  newCancel.addEventListener("click", () => {
    hideModal();
    if (onCancel) onCancel();
  });

  // focus input field so user can type immediately
  document.getElementById("modal-input").focus();
}

function showAlertModal(title, message, onConfirm) {
  // get elements by id
  const {
    title: alertTitle,
    message: messageElement,
    input,
    confirm: confirmBtn,
    cancel,
  } = getModalElements();

  // set title and message text
  alertTitle.textContent = title;
  messageElement.textContent = message;

  input.style.display = "none"; // hide input field

  messageElement.style.display = "flex"; // show message div

  cancel.style.display = "none"; // hide cancel button

  showModal(); // show overlay

  // clone and replace confirm button
  const newConfirm = confirmBtn.cloneNode(true);
  confirmBtn.parentNode.replaceChild(newConfirm, confirmBtn);
  newConfirm.textContent = "OK";

  newConfirm.addEventListener("click", () => {
    hideModal();
    if (onConfirm) onConfirm();
  });
}

export { createModal, showInputModal, showAlertModal };
