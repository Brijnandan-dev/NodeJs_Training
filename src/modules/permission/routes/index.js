const express = require('express');
const router = express.Router();
const createPermissionRoute = require('./createPermission')
const getPermissionRoute = require('./getPermission')
const deletePermissionRoute = require('./deletePermission')
const updatePermissionRoute = require('./updatePermission')


router.use('/create-permission', createPermissionRoute)
router.use('/get-permission', getPermissionRoute)
router.use('/delete-permission', deletePermissionRoute)
router.use('/update-permission', updatePermissionRoute)

module.exports = router;