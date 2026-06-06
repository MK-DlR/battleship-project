// src/helpers/domHelpers.js

function createBoardWrapper(boardContainer) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("board-wrapper");

  // create column labels container
  const colLabels = document.createElement("div");
  colLabels.classList.add("column-labels");
  colLabels.style.display = "grid";

  // add empty corner cell
  const cornerCell = document.createElement("div");
  cornerCell.classList.add("corner-cell");
  colLabels.appendChild(cornerCell);

  // add letters A-J as column labels
  for (let i = 0; i < 10; i++) {
    const label = document.createElement("div");
    label.textContent = String.fromCharCode(65 + i);
    label.classList.add("label");
    colLabels.appendChild(label);
  }

  // create a container for row labels + board, side by side
  const boardRow = document.createElement("div");
  boardRow.style.display = "flex";

  // create row labels container
  const rowLabels = document.createElement("div");
  rowLabels.classList.add("row-labels");
  rowLabels.style.display = "grid";
  rowLabels.style.marginRight = "2px";

  for (let i = 1; i <= 10; i++) {
    const label = document.createElement("div");
    label.textContent = i;
    label.classList.add("label");
    rowLabels.appendChild(label);
  }

  boardRow.appendChild(rowLabels);
  boardRow.appendChild(boardContainer);

  wrapper.appendChild(colLabels);
  wrapper.appendChild(boardRow);

  return wrapper;
}

export { createBoardWrapper };
