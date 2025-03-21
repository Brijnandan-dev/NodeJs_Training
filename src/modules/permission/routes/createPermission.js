const { Router } = require('express');
const validate = require('../../user/middlewares/validation');
const { permissionSchema } = require('../schema/permissionSchema');
const createPermission = require('../controllers/createPermission');
const {
  verifyAccessToken,
} = require('../../../../authentiction/authMiddleware');
const router = Router();

router.post('/create-permission', verifyAccessToken, async (req, res, next) => {
  try {
    await validate(permissionSchema, req.body);
    await createPermission(req, res, next);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
