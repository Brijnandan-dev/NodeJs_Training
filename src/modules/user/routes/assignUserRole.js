const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validation');
const { userRoleSchema } = require('../schema/userRoleSchema');
const { verifyAccessToken } = require('../../../../authentiction/authMiddleware');
const {assignRoleToUser} = require('../controllers/userRoleController');
const verifyPermission = require('../middlewares/verifyPermission');


router.post('/',verifyAccessToken , verifyPermission('write'), async(req, res, next) => {
        try {
            await validate(userRoleSchema, req.body),
            await assignRoleToUser(req, res, next)
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router