const { ValidationError, NotFoundError } = require("./CustomErrors");
const { Prisma } = require("@prisma/client");

function errorHandler(err, req, res, next) {
  if (err instanceof ValidationError || err instanceof NotFoundError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return res.status(400).json({ error: "Duplicate entry - unique constraint failed." });
    }
  }

  console.error(err); // for debugging
  res.status(500).json({ error: "Internal Server Error" });
}

module.exports = errorHandler;
