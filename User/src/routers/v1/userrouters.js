const { usercontroller } = require('../../controllers')
const verfiytoken = require('../../middlewares/userverfication')

const app = require('express').Router()
app.post('/signup',usercontroller.createusercontroller)
app.get('/login',usercontroller.checkusercontroller)
module.exports=app