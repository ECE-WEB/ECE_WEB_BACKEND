const router = require('express').Router()
const checkserver = require('./checkserver')
router.use('/checkserver',checkserver)
module.exports=router