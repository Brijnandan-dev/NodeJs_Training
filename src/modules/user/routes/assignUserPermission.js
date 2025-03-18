const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validation');
const { verifyAccessToken } = require('../../../../authentiction/authMiddleware');
const { userPermissionSchema } = require('../schema/userPermissionSchema');
const { assignPermissionToUser } = require('../controllers/userPermissionController');


router.post('/',  verifyAccessToken, async(req, res, next) => {
        try {
            await validate(userPermissionSchema, req.body),
            await assignPermissionToUser(req, res, next)
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router