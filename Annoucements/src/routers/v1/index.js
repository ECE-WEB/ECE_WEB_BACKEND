const routers= require('express').Router()  
const checkserver = require('./checkserver')
const annoucemnetsrouter = require('./annoucementrouter')
routers.use('/checkserver',checkserver)
routers.use('/annoucements',annoucemnetsrouter)
module.exports=routers