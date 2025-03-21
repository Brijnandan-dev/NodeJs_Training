const { Router } = require('express');
const validate = require('../../user/middlewares/validation');
const { roleParamsSchema } = require('../schema/roleSchema');
const deleteRole = require('../controllers/deleteRole');
const {
  verifyAccessToken,
} = require('../../../../authentiction/authMiddleware');
const authorize = require('../../../../lib/authorize');
const router = Router();

router.delete('/delete-role/:roleId', verifyAccessToken, authorize('Role Management', ['update']), async (req, res, next) => {
  try {
    await validate(roleParamsSchema, req.params);
    await deleteRole(req, res, next);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
