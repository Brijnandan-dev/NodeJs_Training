const express = require('express');
const router = express.Router();
const createResourceRoute = require('./createResource');
const getResourceRoute = require('./getResource');
const assignResourcePermissioinRoute = require('./assignResourcePermission');

router.use('/create-resource', createResourceRoute);
router.use('/get-resource', getResourceRoute);
router.use('/assign-resource-permission', assignResourcePermissioinRoute);

module.exports = router;
