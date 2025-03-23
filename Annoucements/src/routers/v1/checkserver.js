const { checkserver } = require('../../config/index')

const app = require('express').Router()
app.get('/',checkserver.checkserver)
module.exports=app
