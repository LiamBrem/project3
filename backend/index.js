const express = require("express");
const app = express();
const errorHandler = require("./middleware/errorHandler");

const PORT = process.env.PORT || 3000;

const boardRoutes = require("./routes/boardRoutes");
const cardRoutes = require("./routes/cardRoutes");
const commentRoutes = require("./routes/commentRoutes");

app.use(express.json());

app.use("/api/boards", boardRoutes);
app.use("/api/cards", cardRoutes);
app.use("/api/comments", commentRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
