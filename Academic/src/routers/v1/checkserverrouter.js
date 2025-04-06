const { checkserver } = require('../../config')

const app = require('express').Router()
app.get('/',checkserver.checkserver)
module.exports=app
