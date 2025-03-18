const {Router} = require('express');
const validate = require('../../user/middlewares/validation');
const {updateRoleBodySchema, roleParamsSchema} = require('../schema/roleSchema');
const updateRole = require('../controllers/updateRole');
const { verifyAccessToken } = require('../../../../authentiction/authMiddleware');
const router = Router();


router.put('/:roleId', verifyAccessToken, async(req, res, next) => {
    try {
        await validate(roleParamsSchema, req.params);
        await validate(updateRoleBodySchema, req.body);
        await updateRole(req, res, next)
    } catch (error) {
        next(error)
    }
} )

module.exports = router;