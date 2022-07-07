function handleErrors(err, req, res, next) {
  return res
    .status(err.statusCode || 503)
    .json({ message: err.message || "Internal server error" });
}

module.exports = handleErrors;
