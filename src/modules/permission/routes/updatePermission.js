const { Router } = require('express');
const validate = require('../../user/middlewares/validation');
const {
  permissionParamsSchema,
  updatePermissionSchema,
} = require('../schema/permissionSchema');
const updatePermission = require('../controllers/updatePermission');
const {
  verifyAccessToken,
} = require('../../../../authentiction/authMiddleware');
const router = Router();

router.put('/:permissionId', verifyAccessToken, async (req, res, next) => {
  try {
    await validate(permissionParamsSchema, req.params);
    await validate(updatePermissionSchema, req.body);
    await updatePermission(req, res, next);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
