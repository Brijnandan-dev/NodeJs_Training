const { Router } = require('express');
const validate = require('../../user/middlewares/validation');
const {
  verifyAccessToken,
} = require('../../../../authentiction/authMiddleware');
const createResource = require('../controllers/createResource');
const { resourceSchema } = require('../schema/resourceSchema');
const router = Router();

router.post('/', verifyAccessToken, async (req, res, next) => {
  try {
    await validate(resourceSchema, req.body);
    await createResource(req, res, next);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
