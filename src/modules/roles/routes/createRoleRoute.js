const {Router} = require('express');
const validate = require('../../user/middlewares/validation');
const {roleSchema} = require('../schema/roleSchema');
const createRole = require('../controllers/createRole');
const router = Router();


router.post('/', async(req, res, next) => {
    try {
        await validate(roleSchema, req.body);
        await createRole(req, res, next)
    } catch (error) {
        next(error)
    }
} )

module.exports = router;