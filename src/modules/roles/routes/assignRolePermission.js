const express = require('express');
const router = express.Router();
const {
  verifyAccessToken,
} = require('../../../../authentiction/authMiddleware');
const checkAccess = require('../../user/middlewares/verifyPermission');
const validate = require('../../user/middlewares/validation');
const { rolePermissionSchema } = require('../schema/roleSchema');
const assignPermissionToRole = require('../controllers/assignRolePermission');

router.post(
  '/',
  verifyAccessToken,
  checkAccess('write'),
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
