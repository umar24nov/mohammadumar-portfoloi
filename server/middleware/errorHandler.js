const errorHandler = (err, req, res, next) => {
  console.error("Unhandled error:", err);

  const statusCode = err.statusCode || 500;
  const message =
    process.env.NODE_ENV === "production"
      ? "Internal server error"
      : err.message;

  res.status(statusCode).json({ error: message });
};

const notFound = (req, res) => {
  res.status(404).json({ error: "Route not found" });
};

module.exports = { errorHandler, notFound };
