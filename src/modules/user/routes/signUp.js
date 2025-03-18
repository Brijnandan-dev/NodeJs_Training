const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validate = require('../middlewares/validation');
const {userSignUpSchema} = require('../schema/schema');

router.post('/', 
    async(req, res, next) => {
        try {
            await validate(userSignUpSchema, req.body)
            await userController.signUp(req, res, next);
        } catch (error) {
            next(error);
        }
    }
);


// in this i have done preprocssing of data wihout using middleware here i'm validation data using express-validator and then doing the controller work
module.exports = router;