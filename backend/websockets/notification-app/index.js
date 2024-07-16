const express = require("express");
const WebSocket = require("ws");

const app = express();
let connectedClients = [];

app.use(express.static("public"));
app.use(express.json());

app.post("/clicks", (request, response) => {
  console.log("POST to /clicks");
  response.status(201).send("Your click reached the server");
});

const server = app.listen(8080, function () {
  console.log("Server is running on http://localhost:8080");
});

const wss = new WebSocket.WebSocketServer({ server: server });

wss.on("connection", function connection(ws) {
  // start code is outside ws.on
  ws.on("error", console.error);
  connectedClients.push({ client: ws, clicks: 0 });

  let maxClicks = Math.max(...connectedClients.map((info) => info.clicks));
  // this is like a foreach but better: Send the max clicks to all connected clients
  for (let client of wss.clients) {
    if (client.readyState === WebSocket.OPEN)
      client.send(JSON.stringify({ type: "max", clicks: maxClicks }));
  }

  // this code happens everytime you get a message
  ws.on("message", (data) => {
    if (data.toString() === "Click!") {
      // send back clicks to client just for them
      const clientInfo = connectedClients.find((info) => info.client === ws);
      clientInfo.clicks++;
      ws.send(JSON.stringify({ type: "personal", clicks: clientInfo.clicks }));
    }

    maxClicks = Math.max(...connectedClients.map((info) => info.clicks));

    for (let client of wss.clients) {
      if (client.readyState === WebSocket.OPEN)
        client.send(JSON.stringify({ type: "max", clicks: maxClicks }));
    }
  });
});

