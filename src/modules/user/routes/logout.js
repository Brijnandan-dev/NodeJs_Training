const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const AppError = require('../../../../utils/appErrors');
const {verifyAccessToken} = require('../middlewares/authMiddleware');

router.post('/logout',
    verifyAccessToken,
    async(req, res, next) => {
        try {
            userController.logoutUser(req, res, next);
        } catch (error) {
            next(error);
        }
    }
);


module.exports = router;