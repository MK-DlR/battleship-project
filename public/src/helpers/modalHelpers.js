// src/helpers/modalHelpers.js

// get modal elements by id
function getModalElements() {
  return {
    overlay: document.getElementById("modal-overlay"),
    title: document.getElementById("modal-title"),
    message: document.getElementById("modal-message"),
    input: document.getElementById("modal-input"),
    confirm: document.getElementById("modal-confirm"),
    cancel: document.getElementById("modal-cancel"),
  };
}

function hideModal() {
  const { overlay } = getModalElements();
  overlay.style.display = "none";
}

function showModal() {
  const { overlay } = getModalElements();
  overlay.style.display = "flex";
}

export { getModalElements, hideModal, showModal };
