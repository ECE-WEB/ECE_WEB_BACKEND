const { userrepository } = require("../repositories");
const userservice = new userrepository()
const {bcryptutils} = require('../utils/index')
const {jwtutils} = require('../utils/index')
const {usererrorresponses} = require("../errors/index")
const {custom_error} = require('../utils/index')
async function createuserservice(data){
    try {
        const {emailerrorresponse,passworderrorresponse,roleerrorresponse} = usererrorresponses
        emailerrorresponse(data);
        passworderrorresponse(data);
        roleerrorresponse(data);
        const user = await userservice.create(data)
        if(user){
            return jwtutils.generatetoken(user)
        }
        throw new Error('Error In Creating User')
    } catch (error) { 
        if(error.code===11000){
            const duplicateError = new Error(`Duplication Error: ${error.keyValue.email} This email is already registered. Please use a different email address, Or move to login page.`)
            duplicateError.statusCode = 409
            throw duplicateError
        }
        if(error.name==='ValidationError'){
            const validationError = new Error(`Validation Error: ${error.message}.`)
            validationError.statusCode = 400
            throw validationError
        }
        throw error
    }
}
async function checkuserservice(data){
    try {
        const {passworderrorresponse} = usererrorresponses
        passworderrorresponse(data)
        // checking correct email format because we dont wheter about login user
        if(!data.email.match(/^\S+@\S+\.\S+$/)){
            const error = new Error('Invalid email format please check the email and try again')
            error.statusCode = 400
            throw error
        }
        
        const loginuser = await userservice.checklogin(data)
       
        if(loginuser){
            if(await bcryptutils.checkhashpassword(data.password,loginuser.password)){
                return  jwtutils.generatetoken(user)
            }
            const error = new Error('Invalid password. Please check and try again.')
            error.statusCode = 401
            throw error
        }
        else{
            const error= new Error('Invalid email format. Please check and try again.')
            error.statusCode = 404
            throw error

        }
    } catch (error) {
        throw error
    }
}
async function getalluserservice(data){
    try {
        if(!data.role){
            if(data.role!=='admin' && data.role!=='superadmin'){
                const error = new Error('You are not authorized to access this resource')
                error.statusCode = 403
                throw error
            }
        }
        const alluser_data = await userservice.getAll()
        return alluser_data
    } catch (error) {
        throw error
    }
}
module.exports={
    createuserservice,
    checkuserservice,
    getalluserservice
}
