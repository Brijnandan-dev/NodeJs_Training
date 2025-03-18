const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {verifyAccessToken} = require('../../../../authentiction/authMiddleware');
const { resetPasswordSchema } = require('../schema/schema');
const validate = require('../middlewares/validation');
///use put and //token inside header not in body(use here not email)

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


// in this i have done preprocssing of data wihout using middleware here i'm validation data using yup validator and then doing the controller work
module.exports = router;