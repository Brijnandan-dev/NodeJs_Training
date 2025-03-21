const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {
  verifyAccessToken,
} = require('../../../../authentiction/authMiddleware');
const validate = require('../middlewares/validation');
const { updateProfileSchema } = require('../schema/schema');
const authorize = require('../../../../lib/authorize');

router.put('/', verifyAccessToken, authorize('User Profile', ['update']), async (req, res, next) => {
  try {
    await validate(updateProfileSchema, req.body),
    await userController.updateUserProfile(req, res, next);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
