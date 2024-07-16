const socket = new WebSocket("ws://localhost:8080");
const board = document.getElementById("board");
const status = document.getElementById("status");

socket.onmessage = function (event) {
  const game = JSON.parse(event.data);
  updateBoard(game.board);
  updateStatus(game);
};

function updateBoard(gameBoard) {
  board.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.textContent = gameBoard[i][j] === "_" ? "" : gameBoard[i][j];
      cell.onclick = () => makeMove(i, j);
      board.appendChild(cell);
    }
  }
}

function updateStatus(game) {
  if (game.winner) {
    if (game.winner === "tie") {
      status.textContent = "It's a tie!";
    } else {
      status.textContent = `Player ${game.winner} wins!`;
    }
  } else {
    status.textContent = `Current player: ${game.player}`;
  }
}

function makeMove(row, col) {
  socket.send(JSON.stringify({ type: "move", row, col }));
}

// Initial board setup
updateBoard([
  ["_", "_", "_"],
  ["_", "_", "_"],
  ["_", "_", "_"],
]);
status.textContent = "Waiting for game to start...";
