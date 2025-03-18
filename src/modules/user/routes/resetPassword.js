const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {verifyAccessToken} = require('../../../../authentiction/authMiddleware');
const { resetPasswordSchema } = require('../schema/schema');
const validate = require('../middlewares/validation');

router.put('/reset-password', 
    verifyAccessToken, async(req, res, next) => {
        try {
            await validate(resetPasswordSchema, req.body), 
            userController.resetPassword(req, res, next);
        } catch (error) {
            next(error);
        }
    }
);


module.exports = router;