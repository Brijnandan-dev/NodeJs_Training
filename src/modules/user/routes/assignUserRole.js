const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validation');
const { userRoleSchema } = require('../schema/userRoleSchema');
const {
  verifyAccessToken,
} = require('../../../../authentiction/authMiddleware');
const { assignRoleToUser } = require('../controllers/userRoleController');
const authorize = require('../../../../lib/authorize');

router.post(
  '/assign-role',
  verifyAccessToken,
  authorize('Employee Management', ['update']),
  async (req, res, next) => {
    try {
      await validate(userRoleSchema, req.body);
      await assignRoleToUser(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
