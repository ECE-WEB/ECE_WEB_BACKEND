const { checkingserver } = require('../../config')
const app = require('express').Router()
app.get('/',checkingserver.checkingserver)
module.exports=app