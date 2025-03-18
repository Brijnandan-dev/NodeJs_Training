const express = require('express');
const router = express.Router();
const signUpRoute = require('./signUp')
const loginRoute = require('./login')
const verifyUserRoute = require('./verifyUser')
const refreshTokenRoute = require('./refreshToken')
const resetPassword = require('./resetPassword');
const logoutUser = require('./logout');
const updateProfile = require('./updateProfile');
const viewProfile = require('./viewProfile');
const assignRole = require('./assignUserRole')
const removeUserRole = require('./removeUserRole')
const assignPermission = require('./assignUserPermission')
const removeUserPermission = require('./removeUserPermission')


router.use('/sign-up', signUpRoute)
router.use('/login', loginRoute)
router.use('/logout', logoutUser)
router.use('/update-profile', updateProfile)
router.use('/view-profile', viewProfile)
router.use('/verify', verifyUserRoute)
router.use('/refresh', refreshTokenRoute)
router.use('/reset', resetPassword)

router.use('/assign-role', assignRole)
router.use('/removeUser-role', removeUserRole)

router.use('/assign-permission', assignPermission)
router.use('/removeUser-permission', removeUserPermission)

module.exports = router;


//in this will add all the routes related to user