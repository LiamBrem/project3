const express = require("express");
//const cors = require('cors');

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Home");
});

// Board Routes
app.get("api/boards", (req, res) => {
  res.send("Get all boards");
});

app.get("api/boards/:id", (req, res) => {
  res.send(`Get board with ID`);
});

app.post("api/boards", (req, res) => {
  res.send("Create a new board");
});

app.delete("api/boards/:id", (req, res) => {
  res.send(`Delete board with ID`);
});

// Card Routes

app.get("api/boards/:boardId/cards", (req, res) => {
  res.send(`Get all cards for board with ID ${req.params.boardId}`);
});

app.post("api/boards/:boardId/cards", (req, res) => {
  res.send(`Create a new card for board with ID ${req.params.boardId}`);
});

app.put("api/boards/:boardId/cards/:cardId", (req, res) => {
  res.send(
    `Update card with ID ${req.params.cardId} for board with ID ${req.params.boardId}`
  );
});

app.delete("api/boards/:boardId/cards/:cardId", (req, res) => {
  res.send(
    `Delete card with ID ${req.params.cardId} for board with ID ${req.params.boardId}`
  );
});

// Comments (Stretch)

// Pinned (Stretch)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
