const app = require('express').Router()
const {checkserver} = require('../../controller/index')
app.get('/',checkserver)
module.exports=app
