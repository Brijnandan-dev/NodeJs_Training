const express = require('express');
const createRoleRoute = require('./createRoleRoute')
const getRoleRoute = require('./getRoleRoute')
const updateRoleRoute = require('./updateRoleRoute')
const deleteRoleRoute = require('./deleteRoleRoute')

const router = express.Router();


router.use('/create-role', createRoleRoute)
router.use('/get-role', getRoleRoute)
router.use('/update-role', updateRoleRoute)
router.use('/delete-role', deleteRoleRoute)

module.exports = router;