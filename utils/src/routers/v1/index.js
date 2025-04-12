const router = require('express').Router();
const server = require('../v1/serverrouter')
const resumerouter = require('./resumerouter')
router.use('/checkserver', server);
router.use('/resume', resumerouter);
module.exports=router