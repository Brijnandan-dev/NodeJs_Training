const express = require('express');
const router = express.Router();
const signUpRoute = require('./signUp')
const loginRoute = require('./login')
const verifyUserRoute = require('./verifyUser')
const refreshTokenRoute = require('./refreshTokenRoute')
const resetPassword = require('./resetPassword');
const logoutUser = require('./logout');
const updateProfile = require('./updateProfile');
const viewProfile = require('./viewProfile');


router.use('/user', signUpRoute)
router.use('/user', loginRoute)
router.use('/user', logoutUser)
router.use('/user', updateProfile)
router.use('/user', viewProfile)
router.use('/user/verify', verifyUserRoute)
router.use('/user/refresh', refreshTokenRoute)
router.use('/user/reset', resetPassword)


module.exports = router;


//in this will add all the routes related to user