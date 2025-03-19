const { Router } = require('express');
const validate = require('../../user/middlewares/validation');
const {
  verifyAccessToken,
} = require('../../../../authentiction/authMiddleware');
const { getResourceSchema } = require('../schema/resourceSchema');
const getResource = require('../controllers/getResource');
const router = Router();

router.get('/', verifyAccessToken, async (req, res, next) => {
  try {
    await validate(getResourceSchema, req.body);
    await getResource(req, res, next);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
