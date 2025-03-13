const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {verifyAccessToken} = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validation');
const { updateProfileSchema } = require('../schema/schema');

router.put('/update-profile', 
    verifyAccessToken,
    async(req, res, next) => {
        try {
            await validate(updateProfileSchema, req.body),
            await userController.updateUserProfile(req, res, next);
        } catch (error) {
            next(error);
        }
    }
);


module.exports = router;