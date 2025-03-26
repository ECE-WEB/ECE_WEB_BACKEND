const { usercontroller } = require('../../controllers')

const app = require('express').Router()
app.post('/signup',usercontroller.createusercontroller)
app.get('/login',usercontroller.checkusercontroller)
module.exports=app