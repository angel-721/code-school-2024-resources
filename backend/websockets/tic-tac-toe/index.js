const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let connectedClients = [];
let game = {
  board: [
    ["_", "_", "_"],
    ["_", "_", "_"],
    ["_", "_", "_"],
  ],
  player: "X",
  winner: "",
};

function resetGame() {
  game.board = [
    ["_", "_", "_"],
    ["_", "_", "_"],
    ["_", "_", "_"],
  ];
  game.player = "X";
  game.winner = "";
}

function checkWinner(board) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    const rowA = Math.floor(a / 3);
    const colA = a % 3;
    const rowB = Math.floor(b / 3);
    const colB = b % 3;
    const rowC = Math.floor(c / 3);
    const colC = c % 3;

    if (
      board[rowA][colA] !== "_" &&
      board[rowA][colA] === board[rowB][colB] &&
      board[rowA][colA] === board[rowC][colC]
    ) {
      return board[rowA][colA];
    }
  }

  if (board.flat().every((cell) => cell !== "_")) {
    return "tie";
  }

  return null;
}

wss.on("connection", function connection(ws) {
  connectedClients.push(ws);

  ws.on("message", function incoming(message) {
    const data = JSON.parse(message);

    if (data.type === "move") {
      const { row, col } = data;
      if (game.board[row][col] === "_" && !game.winner) {
        game.board[row][col] = game.player;
        game.winner = checkWinner(game.board);
        game.player = game.player === "X" ? "O" : "X";

        // Broadcast updated game state to all clients
        const gameState = JSON.stringify(game);
        connectedClients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(gameState);
          }
        });

        if (game.winner) {
          setTimeout(resetGame, 3000); // Reset game after 3 seconds
        }
      }
    }
  });

  ws.on("close", function () {
    connectedClients = connectedClients.filter((client) => client !== ws);
  });

  // Send initial game state to the new client
  ws.send(JSON.stringify(game));
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

