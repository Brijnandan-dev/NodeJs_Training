const express = require('express');
const router = express.Router();
const {
  verifyAccessToken,
} = require('../../../../authentiction/authMiddleware');
const { resourcePermissionSchema } = require('../schema/resourceSchema');
const validate = require('../../user/middlewares/validation');
const assignPermissionToResource = require('../controllers/assignResourcePermission');
const authorize = require('../../../../lib/authorize');

router.post(
  '/assign-resource-permission',
  verifyAccessToken,
  authorize('Employee Management', ['update']),
  async (req, res, next) => {
    try {
      await validate(resourcePermissionSchema, req.body),
      await assignPermissionToResource(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
