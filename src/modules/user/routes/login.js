const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { loginUserSchema } = require('../schema/schema');
const validate = require('../middlewares/validation');


router.post('/', async(req, res, next) => {
        try {
            await validate(loginUserSchema, req.body),
            await userController.loginUser(req, res, next);
        } catch (error) {
            next(error);
        }
    }
);


// in this i have done preprocssing of data wihout using middleware here i'm validation data using express-validator and then doing the controller work
module.exports = router;