class AppError extends Error {
    constructor(message, statusCode, errors = null) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors; // Ensure this field matches what globalErrorHandler expects
    }
}

module.exports = AppError;


//for formatting error