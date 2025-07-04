const { Router } = require('express');
const validate = require('../../user/middlewares/validation');
const {
  verifyAccessToken,
} = require('../../../../authentiction/authMiddleware');
const createResource = require('../controllers/createResource');
const { resourceSchema } = require('../schema/resourceSchema');
const authorize = require('../../../../lib/authorize');
const router = Router();

router.post('/create-resource', verifyAccessToken, authorize('Employee Management', ['create']), async (req, res, next) => {
  try {
    await validate(resourceSchema, req.body);
    await createResource(req, res, next);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
