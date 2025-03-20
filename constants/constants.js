const MAIN_ROUTE = 'http://localhost:3000/user/';

// utils/constants.js

const STATUS_CODES = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  CONFLICT: 409,
};

const MESSAGES = {
  USER_NOT_FOUND: 'User not found',
  INVALID_CREDENTIALS: 'Invalid username/email or password',
  UNAUTHORIZED_ACCESS: 'Unauthorized access',
  UNAUTHORIZED_INVALID_TOKEN: 'Unauthorized: Invalid token',
  INTERNAL_SERVER_ERROR: 'Something went wrong, please try again',
  REFRESH_TOKEN_MISSING: 'Refresh token missing',
  INVALID_REFRESH_TOKEN: 'Invalid refresh token',
  ROLE_NOT_FOUND: 'role does not exists',
  PERMISSION_NOT_FOUND: 'permission does not exists',
  RESOURCE_NOT_FOUND: 'resource does not exists',
  ROLE_ALREADY_ASSIGNED: 'Role already assigned to user',
  PERMISSION_ALREADY_ASSIGNED: 'Permission already assigned',
  TOKEN_EXPIRED: 'Access token has expired',
  INVALID_TOKEN: 'Invalid access token',
  AUTHENTICATION_FAILED: 'Authentication failed'
};

const ACCESS_TOKEN_EXPIRATION = '1h'; // Token expiry time for JWT 1 hour
const REFRESH_TOKEN_EXPIRATION = '7d';// Token expiry time for JWT 
const COOKIE_EXPIRATION = 7 * 24 * 60 * 60 * 1000; //7d in seconds

module.exports = {
  STATUS_CODES,
  MESSAGES,
  ACCESS_TOKEN_EXPIRATION,
  REFRESH_TOKEN_EXPIRATION,
  COOKIE_EXPIRATION,
  MAIN_ROUTE,
};
