const { Router } = require('express');
const validate = require('../../user/middlewares/validation');
const { getRoleSchema } = require('../schema/roleSchema');
const getRole = require('../controllers/getRole');
const {
  verifyAccessToken,
} = require('../../../../authentiction/authMiddleware');
const authorize = require('../../../../lib/authorize');
const router = Router();

router.get('/get-role', verifyAccessToken, authorize('Role Management', ['view']), async (req, res, next) => {
  try {
    await validate(getRoleSchema, req.body);
    await getRole(req, res, next);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
