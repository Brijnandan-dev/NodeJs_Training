const errorHandler = async (err, req, res) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message,
    error: err.details,
  });
};

module.exports = {
  errorHandler,
};
