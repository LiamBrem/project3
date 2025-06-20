const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { validateBoardBody } = require("../middleware/validate");
const { NotFoundError } = require("../middleware/CustomErrors");

// import categories from constants
const CATEGORIES = require("../utils/constants");

const prisma = new PrismaClient();
const router = express.Router();

// GET /api/boards
router.get("/", async (req, res, next) => {
  const { searchCriteria, sortCriteria } = req.query;
  try {
    const isRecent =
      sortCriteria && sortCriteria.trim().toLowerCase() === "recent";
    const where = {
      ...(searchCriteria &&
        searchCriteria.trim() !== "" && {
          title: {
            contains: searchCriteria,
            mode: "insensitive",
          },
        }),
      ...(!isRecent &&
        sortCriteria &&
        sortCriteria.trim().toLowerCase() !== "all" &&
        sortCriteria.trim().toLowerCase() !== "recent" &&
        sortCriteria.trim() !== "" && {
          category: sortCriteria,
        }),
    };
    const boards = await prisma.board.findMany({
      where,
      include: { cards: true },
      orderBy: { createdAt: "desc" },
      ...(isRecent && { take: 6 }),
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
    const { title, category, author, imageUrl: initialImageUrl } = req.body;
    let imageUrl = initialImageUrl;
    if (!CATEGORIES.includes(category)) {
      return res.status(400).json({ error: "Invalid category" });
    }
    if (imageUrl === "" || !imageUrl) {
      imageUrl = "https://picsum.photos/200/300";
    }
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
