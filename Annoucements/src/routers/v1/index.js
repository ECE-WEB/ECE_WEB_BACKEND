const routers= require('express').Router()  
const checkserver = require('./checkserver')
const annoucemnetsrouter = require('./annoucementrouter')
routers.use('/checkserver',checkserver)
routers.use('/announcements',annoucemnetsrouter)
module.exports=routers