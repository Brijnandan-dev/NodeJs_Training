const { Router } = require('express');
const validate = require('../../user/middlewares/validation');
const { permissionParamsSchema } = require('../schema/permissionSchema');
const deletePermission = require('../controllers/deletePermission');
const {
  verifyAccessToken,
} = require('../../../../authentiction/authMiddleware');
const router = Router();

router.delete('/:permissionId', verifyAccessToken, async (req, res, next) => {
  try {
    await validate(permissionParamsSchema, req.params);
    await deletePermission(req, res, next);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
