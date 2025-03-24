
const router = require('express').Router() 
const checkserverrouter = require('./checkserverrouter')
router.use('/checkserver',checkserverrouter)
module.exports=router