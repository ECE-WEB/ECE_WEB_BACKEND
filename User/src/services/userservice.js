const { userrepository } = require("../repositories");
const userservice = new userrepository()
const {bcryptutils} = require('../utils/index')
async function createuserservice(data){
    try {
        const user = await userservice.create(data)
        return user
    } catch (error) {
        throw error
    }
}
async function checkuserservice(data){
    try {
        const loginuser = await userservice.checklogin(data)
       
        
        if(loginuser){
            if(await bcryptutils.checkhashpassword(data.password,loginuser.password)){
                return loginuser
            }
            throw new Error('Invalid password')
        }
        else{
            throw new Error('Invalid email')

        }
    } catch (error) {
        throw error
    }
}
module.exports={
    createuserservice,
    checkuserservice
}