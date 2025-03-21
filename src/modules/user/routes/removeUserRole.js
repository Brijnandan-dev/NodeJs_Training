const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validation');
const { userRoleSchema } = require('../schema/userRoleSchema');
const {
  verifyAccessToken,
} = require('../../../../authentiction/authMiddleware');
const { removeUserRole } = require('../controllers/userRoleController');
const authorize = require('../../../../lib/authorize');

router.delete('/removeUser-role', verifyAccessToken, authorize('Employee Management', ['update']), async (req, res, next) => {
  try {
    await validate(userRoleSchema, req.body),
    await removeUserRole(req, res, next);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
