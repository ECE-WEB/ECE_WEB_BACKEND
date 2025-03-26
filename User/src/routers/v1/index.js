const router = require('express').Router() 
const checkserverrouter = require('./checkserverrouter')
const userrouter = require('./userrouters')
router.use('/checkserver',checkserverrouter)
router.use('/user',userrouter)
module.exports=router