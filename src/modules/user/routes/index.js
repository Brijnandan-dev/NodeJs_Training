const express = require('express');
const router = express.Router();
const path = require('path');
const glob = require('glob');

glob.sync(path.join(__dirname, './*.js')).forEach((file) => {
  if (file !== __filename) {
    router.use(require(file));
  }
});

module.exports = router;

//in this i have used glob which will get all files in the directory and provide them in router so no need to do this individually
// const signUpRoute = require('./signUp');
// const loginRoute = require('./login');
// router.use('/sign-up', signUpRoute);
// router.use('/login', loginRoute);