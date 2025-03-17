const router = require('express').Router()
const server = require('./serverrouter')
router.use('/server',server)
module.exports=router