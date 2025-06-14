const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { NotFoundError, ValidationError } = require("../middleware/CustomErrors");

const prisma = new PrismaClient();
const router = express.Router({ mergeParams: true });

// GET /api/boards/:boardId/cards/:cardId/comments
router.get("/", async (req, res, next) => {
  try {
    const { cardId } = req.params;

    const comments = await prisma.comment.findMany({
      where: { cardId: parseInt(cardId) },
      orderBy: { createdAt: "asc" },
    });

    res.json(comments);
  } catch (err) {
    next(err);
  }
});

// POST /api/boards/:boardId/cards/:cardId/comments
router.post("/", async (req, res, next) => {
  try {
    const { message, author } = req.body;
    const { cardId } = req.params;

    if (!message) {
      throw new ValidationError("Comment 'message' is required.");
    }

    const comment = await prisma.comment.create({
      data: {
        message,
        author,
        cardId: parseInt(cardId),
      },
    });

    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/boards/:boardId/cards/:cardId/comments/:commentId
router.delete("/:commentId", async (req, res, next) => {
  try {
    const { commentId } = req.params;

    const deletedComment = await prisma.comment.delete({
      where: { id: parseInt(commentId) },
    });

    res.json(deletedComment);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
