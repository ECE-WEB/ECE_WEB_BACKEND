const { checkserver } = require('../../config/index')

const app = require('express').Router()

app.get('/',checkserver.checkerserver)

module.exports=app