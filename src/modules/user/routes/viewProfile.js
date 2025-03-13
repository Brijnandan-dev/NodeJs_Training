const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {verifyAccessToken} = require('../middlewares/authMiddleware');

router.get('/view-profile', 
    verifyAccessToken,
    async(req, res, next) => {
        try {
            userController.viewProfile(req, res, next);
        } catch (error) {
            next(error);
        }
    }
);


module.exports = router;