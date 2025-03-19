const { Router } = require('express');
const validate = require('../../user/middlewares/validation');
const { getPermissionSchema } = require('../schema/permissionSchema');
const getPermission = require('../controllers/getPermission');
const {
  verifyAccessToken,
} = require('../../../../authentiction/authMiddleware');
const router = Router();

router.get('/', verifyAccessToken, async (req, res, next) => {
  try {
    await validate(getPermissionSchema, req.body);
    await getPermission(req, res, next);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
