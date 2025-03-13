const MAIN_ROUTE = 'http://localhost:3000/user/'

// utils/constants.js

const STATUS_CODES = {
    SUCCESS: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
};

const MESSAGES = {
    USER_NOT_FOUND: "User not found",
    INVALID_CREDENTIALS: "Invalid username/email or password",
    UNAUTHORIZED_ACCESS: "Unauthorized access",
    UNAUTHORIZED_INVALID_TOKEN: "Unauthorized: Invalid token",
    INTERNAL_SERVER_ERROR: "Something went wrong, please try again",
    REFRESH_TOKEN_MISSING: "Refresh token missing",
    INVALID_REFRESH_TOKEN: "Invalid refresh token"
};

const ACCESS_TOKEN_EXPIRATION = 60 * 60 * 1000; // Token expiry time for JWT
const REFRESH_TOKEN_EXPIRATION =  7 * 24 * 60 * 60 * 1000; // Token expiry time for JWT

module.exports = { STATUS_CODES, MESSAGES, ACCESS_TOKEN_EXPIRATION, REFRESH_TOKEN_EXPIRATION, MAIN_ROUTE };
