const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyUserSchema } = require('../schema/schema');
const validate = require('../middlewares/validation');

router.get('/email/:token', async (req, res, next) => {
  try {
    await validate(verifyUserSchema, req.params),
    await userController.verifyUser(req, res, next);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
