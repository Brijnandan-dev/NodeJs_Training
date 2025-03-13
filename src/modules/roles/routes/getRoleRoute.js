const {Router} = require('express');
const validate = require('../../user/middlewares/validation');
const {getRoleSchema} = require('../schema/roleSchema');
const getRole = require('../controllers/getRole');
const router = Router();


router.post('/', async(req, res, next) => {
    try {
        await validate(getRoleSchema, req.body);
        await getRole(req, res, next)
    } catch (error) {
        next(error)
    }
} )


module.exports = router;