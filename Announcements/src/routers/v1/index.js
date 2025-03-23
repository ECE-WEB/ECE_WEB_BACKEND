const router = require('express').Router()
const checkserver = require('./checkserverrouter')
router.use('/checkserver',checkserver)
module.exports=router;
