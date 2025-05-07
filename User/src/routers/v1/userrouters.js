const { usercontroller } = require('../../controllers')
const { uservalidationmiddleware,userverificationmiddleware } = require('../../middlewares')

const { uservalidation  } = require('../../validations')
const app = require('express').Router()
app.post('/signup',
    uservalidation.signupValidation,
    uservalidationmiddleware.validateUser,
    usercontroller.createusercontroller)
app.get('/login',
    uservalidation.loginValidation,
    uservalidationmiddleware.validateUser,
    usercontroller.checkusercontroller)
app.get('/',
    uservalidation.tokenValidation,
    uservalidationmiddleware.validateUser,
    userverificationmiddleware.verfiytoken,
    usercontroller.getallusercontroller)
module.exports=app