const { userservice } = require("../services");
const { success, fail } = require("../utils");

async function createusercontroller(req,res){
    try {
        const user = await userservice.createuserservice(req.body)
        success.data=user
        return res.status(201).json(success)   
    } catch (error) {
        fail.error=error.message
        return res.status(500).json(fail)
    }
}
async function checkusercontroller(req,res){
    try {
        const user= await userservice.checkuserservice(req.body)
        success.data=user
        return res.status(200).json(success)
    } catch (error) {
        console.log(error)
        fail.error=error.message
        return res.status(400).json(fail)
    }
}
async function getallusercontroller(req,res){
    try {
        const alluser_data = await userservice.getalluserservice()
        success.data = alluser_data
        return res.status(201).json(success)

    } catch (error) {
        fail.error = error.message || error
        return res.status(500).json(error)
    }
}
module.exports={
    createusercontroller,
    checkusercontroller,
    getallusercontroller
}