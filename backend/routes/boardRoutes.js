const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { validateBoardBody } = require("../middleware/validate");
const { NotFoundError } = require("../middleware/CustomErrors");

const prisma = new PrismaClient();
const router = express.Router();

// GET /api/boards
router.get("/", async (req, res, next) => {
  try {
    const boards = await prisma.board.findMany({
      include: { cards: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(boards);
  } catch (err) {
    next(err);
  }
});

// GET /api/boards/:id
router.get("/:id", async (req, res, next) => {
  try {
    const board = await prisma.board.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { cards: true },
    });
    if (!board) throw new NotFoundError("Board not found");
    res.json(board);
  } catch (err) {
    next(err);
  }
});

// POST /api/boards
router.post("/", validateBoardBody, async (req, res, next) => {
  try {
    const { title, category, author, imageUrl } = req.body;
    const board = await prisma.board.create({
      data: { title, category, author, imageUrl },
    });
    res.status(201).json(board);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/boards/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await prisma.board.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json(deleted);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
