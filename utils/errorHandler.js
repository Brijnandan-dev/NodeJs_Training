const AppError = require('./appErrors');

// const asyncWrapper = (handler) => (req, res, next) => {
//   Promise.resolve(handler(req, res, next)).catch((err) => next(err));
// };


const globalErrorHandler = (err, req, res, next) => {
    let { statusCode, message, errors } = err;

    // Default values if missing
    statusCode = statusCode || 500;
    message = message || 'Internal Server Error';

    res.status(statusCode).json({
        status: 'error',
        message,
        errors: errors || (err.details ? err.details : null) // Include details if available
    });
};

module.exports = globalErrorHandler;



// module.exports = {asyncWrapper, globalErrorHandler};

//to avoid try catch and thi ensures all errors in async functions are automatically passed to next(error)
