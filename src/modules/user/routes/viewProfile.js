const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {
  verifyAccessToken,
} = require('../../../../authentiction/authMiddleware');
const authorize = require('../../../../lib/authorize');

router.get('/view-profile', verifyAccessToken,  authorize('User Profile', ['view']), async (req, res, next) => {
  try {
    userController.viewProfile(req, res, next);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
