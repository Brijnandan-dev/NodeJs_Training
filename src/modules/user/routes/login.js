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


module.exports = router;