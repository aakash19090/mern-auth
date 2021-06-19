// ! This is protected Route. Router will first use 'checkAuth' middleware before proceeding route controller

const express = require('express');
const router = express.Router();
const { getPrivateData } = require('../controllers/protected')
const { checkAuth } = require('../middleware/routeAuth')

router.route('/').get(checkAuth, getPrivateData);

module.exports = router