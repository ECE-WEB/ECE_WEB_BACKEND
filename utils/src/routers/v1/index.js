const router = require('express').Router();
const server = require('../v1/serverrouter')
router.use('/checkserver', server);
module.exports=router