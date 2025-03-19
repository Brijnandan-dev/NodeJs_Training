const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validation');
const { userRoleSchema } = require('../schema/userRoleSchema');
const {
  verifyAccessToken,
} = require('../../../../authentiction/authMiddleware');
const { removeUserRole } = require('../controllers/userRoleController');

router.delete('/', verifyAccessToken, async (req, res, next) => {
  try {
    await validate(userRoleSchema, req.body),
    await removeUserRole(req, res, next);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
