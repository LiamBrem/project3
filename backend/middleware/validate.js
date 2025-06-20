const { ValidationError } = require("./CustomErrors");

function validateBoardBody(req, res, next) {
  const { title, category } = req.body;
  if (!title || !category) {
    throw new ValidationError("Both 'title' and 'category' are required.");
  }
  next();
}

function validateCardBody(req, res, next) {
  const { message, gifUrl } = req.body;
  if (!message || !gifUrl) {
    throw new ValidationError("Both 'message' and 'gifUrl' are required.");
  }
  next();
}

module.exports = { validateBoardBody, validateCardBody };
