const express = require('express');
const router = express.Router();
const {
  verifyAccessToken,
} = require('../../../../authentiction/authMiddleware');
const { getUserRole } = require('../controllers/userRoleController');
const authorize = require('../../../../lib/authorize');

router.get(
  '/get-role',
  verifyAccessToken,
  authorize('Employee Management', 'view'),
  async (req, res, next) => {
    try {
      await getUserRole(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
