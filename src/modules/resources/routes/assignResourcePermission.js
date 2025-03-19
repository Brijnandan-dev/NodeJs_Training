const express = require('express');
const router = express.Router();
const {
  verifyAccessToken,
} = require('../../../../authentiction/authMiddleware');
const checkAccess = require('../../user/middlewares/verifyPermission');
const { resourcePermissionSchema } = require('../schema/resourceSchema');
const validate = require('../../user/middlewares/validation');
const assignPermissionToResource = require('../controllers/assignResourcePermission');

router.post(
  '/',
  verifyAccessToken,
  checkAccess('write'),
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
