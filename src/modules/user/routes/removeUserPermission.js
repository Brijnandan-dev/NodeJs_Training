const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validation');
const {
  verifyAccessToken,
} = require('../../../../authentiction/authMiddleware');
const { userPermissionSchema } = require('../schema/userPermissionSchema');
const {
  removeUserPermission,
} = require('../controllers/userPermissionController');
const authorize = require('../../../../lib/authorize');

router.delete('/removeUser-permission', verifyAccessToken, authorize('Employee Management', ['update']), async (req, res, next) => {
  try {
    await validate(userPermissionSchema, req.body),
    await removeUserPermission(req, res, next);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
