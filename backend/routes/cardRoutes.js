const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { validateCardBody } = require("../middleware/validate");
const { NotFoundError } = require("../middleware/CustomErrors");

const prisma = new PrismaClient();
const router = express.Router({ mergeParams: true });

// GET /api/boards/:boardId/cards
router.get("/", async (req, res, next) => {
  try {
    const cards = await prisma.card.findMany({
      where: { boardId: parseInt(req.params.boardId) },
      orderBy: [{ pinned: "desc" }, { createdAt: "desc" }],
    });
    res.json(cards);
  } catch (err) {
    next(err);
  }
});

// POST /api/boards/:boardId/cards
router.post("/", validateCardBody, async (req, res, next) => {
  try {
    const { message, gifUrl, author } = req.body;
    const card = await prisma.card.create({
      data: {
        message,
        gifUrl,
        author,
        boardId: parseInt(req.params.boardId),
      },
    });
    res.status(201).json(card);
  } catch (err) {
    next(err);
  }
});

// PUT /api/boards/:boardId/cards/:cardId/upvote
router.put("/:cardId/upvote", async (req, res, next) => {
  try {
    const card = await prisma.card.update({
      where: { id: parseInt(req.params.cardId) },
      data: { upvotes: { increment: 1 } },
    });
    res.json(card);
  } catch (err) {
    next(err);
  }
});

// PUT /api/boards/:boardId/cards/:cardId/pin
router.put("/:cardId/pin", async (req, res, next) => {
  console.log(req.params);
  try {
    const card = await prisma.card.update({
      where: { id: parseInt(req.params.cardId) },
      data: { pinned: true },
    });
    res.json(card);
  } catch (err) {
    next(err);
  }
});

// PUT /api/boards/:boardId/cards/:cardId/unpin
router.put("/:cardId/unpin", async (req, res, next) => {
  try {
    const card = await prisma.card.update({
      where: { id: parseInt(req.params.cardId) },
      data: { pinned: false },
    });
    res.json(card);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/boards/:boardId/cards/:cardId
router.delete("/:cardId", async (req, res, next) => {
  try {
    const card = await prisma.card.delete({
      where: { id: parseInt(req.params.cardId) },
    });
    if (!card) return res.status(404).json({ error: "Card not found" });
    res.json(card);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
