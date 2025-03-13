const express = require('express');
const createRoleRoute = require('./createRoleRoute')
const getRoleRoute = require('./getRoleRoute')

const router = express.Router();


router.use('/create-role', createRoleRoute)
router.use('/get-role', getRoleRoute)


module.exports = router;