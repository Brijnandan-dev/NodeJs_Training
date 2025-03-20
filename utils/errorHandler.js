const globalErrorHandler = (err, req, res, next) => {
  let { statusCode, message, errors } = err;

  // Default values if missing
  statusCode = statusCode || 500;
  message = message || 'Internal Server Error';

  res.status(statusCode).json({
    status: 'error',
    message,
    errors: errors || (err.details ? err.details : null), // Include details if available
  });
};

module.exports = globalErrorHandler;
