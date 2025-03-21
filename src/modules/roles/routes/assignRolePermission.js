const express = require('express');
const router = express.Router();
const {
  verifyAccessToken,
} = require('../../../../authentiction/authMiddleware');
const validate = require('../../user/middlewares/validation');
const { rolePermissionSchema } = require('../schema/roleSchema');
const assignPermissionToRole = require('../controllers/assignRolePermission');
const authorize = require('../../../../lib/authorize');

router.post(
  '/assign-role-permission',
  verifyAccessToken,
  authorize('Employee Management', ['update']),
  async (req, res, next) => {
    try {
      await validate(rolePermissionSchema, req.body),
      await assignPermissionToRole(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
