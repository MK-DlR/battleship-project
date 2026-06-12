// src/controllers/battleLogController.js

let battleLogs = [];

// render battlelog for side panel
function renderBattleLog(parent) {
  let battleLogContainer = document.querySelector(".battle-log-container");

  if (!battleLogContainer) {
    // create container for battle log
    battleLogContainer = document.createElement("div");
    battleLogContainer.classList.add("battle-log-container");

    // create header for battle log
    const battleLogHeader = document.createElement("div");
    battleLogHeader.classList.add("battle-log-header");
    battleLogHeader.innerHTML = `Battle Log`;

    // create scrollable div for battle log
    const battleLogEntries = document.createElement("div");
    battleLogEntries.classList.add("battle-log-entries");
    battleLogEntries.classList.add("custom-scrollbar");

    // append everything
    battleLogContainer.appendChild(battleLogHeader);
    battleLogContainer.appendChild(battleLogEntries);

    parent.appendChild(battleLogContainer);
  }

  const battleLogEntries = battleLogContainer.querySelector(
    ".battle-log-entries",
  );

  if (!battleLogEntries) return;

  battleLogEntries.innerHTML = "";

  for (const log of battleLogs) {
    // create battle log entry
    const entry = document.createElement("div");
    entry.classList.add("battle-log-entry");

    // create styled dot
    const dot = document.createElement("div");
    dot.classList.add("battle-log-dot");
    // conditionally add class based on player
    if (log.playerIndex === 0) {
      dot.classList.add("battle-log-dot--p1");
    } else {
      dot.classList.add("battle-log-dot--p2");
    }

    // create battle log turn + text wrapper
    const entryContent = document.createElement("div");
    entryContent.classList.add("battle-log-entry-content");

    // create battle log turn
    const turn = document.createElement("div");
    turn.classList.add("battle-log-turn");
    turn.textContent = log.attackerName;

    // create battle log text content
    const text = document.createElement("div");
    text.classList.add("battle-log-text");

    if (log.result?.type === "ship_sunk") {
      text.innerHTML = `<div class="battle-log-sunk">Sunk ${log.defenderName}'s ${log.shipName}!</div>`;
    } else if (log.result === "hit") {
      text.textContent = `Hit at ${log.coordinates}`;
    } else if (log.result === "miss") {
      text.textContent = `Miss at ${log.coordinates}`;
    } else if (log.result === "game_over") {
      text.innerHTML = `<div class="battle-log-win">Game over! 🎉 ${log.attackerName} wins! 🎉</div>`;
    }

    entry.appendChild(dot);
    entryContent.appendChild(turn);
    entryContent.appendChild(text);
    entry.appendChild(entryContent);

    battleLogEntries.appendChild(entry);
  }

  battleLogEntries.scrollTop = battleLogEntries.scrollHeight;
}

// add battle log entry
function addBattleLogEntry(
  attackerName,
  result,
  coordinates,
  shipName,
  defenderName,
  playerIndex,
) {
  // format name based on game type
  if (attackerName === "Player 1") {
    attackerName = "P1";
  } else if (attackerName === "Player 2") {
    attackerName = "P2";
  } else if (attackerName === "Computer") {
    attackerName = "CPU";
  } else {
    attackerName = attackerName.toUpperCase();
  }

  // push entry to battle log
  battleLogs.push({
    attackerName,
    result,
    coordinates,
    shipName,
    defenderName,
    playerIndex,
  });

  renderBattleLog();
}

// reset battle log
function resetBattleLog() {
  battleLogs = [];
}

export { renderBattleLog, addBattleLogEntry, resetBattleLog };
