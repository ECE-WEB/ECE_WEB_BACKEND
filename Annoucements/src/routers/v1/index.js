const routers= require('express').Router()  
const checkserver = require('./checkserver')
routers.use('/checkserver',checkserver)
module.exports=routers