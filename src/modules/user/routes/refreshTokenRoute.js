const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyAccessToken } = require('../middlewares/authMiddleware');

router.get('/refresh-token',verifyAccessToken, async (req, res, next) => {
    try {
        userController.refreshAccessToken(req, res, next);
    } catch (error) {
        next(error);
    }
});


// in this i have done preprocssing of data wihout using middleware here i'm validation data using express-validator and then doing the controller work
module.exports = router;