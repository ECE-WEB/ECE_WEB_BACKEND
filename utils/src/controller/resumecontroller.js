const {resumeservice} = require('../services/index')
const { success ,fail} = require('../utils')
async function createnewresumecontroller(req,res){
    try {
        const newuserresume = await resumeservice.createnewresumeservice(req.body)
        success.data= newuserresume
        return res.status(201).json(success)
    } catch (error) {
        fail.message=error.message
        fail.error=error
        return res.status(500).json(fail)
    }
}
async function getuserdata(req,res){
    try {
        const user_data = await resumeservice.getdatabyuserid(req.params)
        success.data=user_data
        return res.status(200).json(success)
    } catch (error) {
        fail.message=error.message
        fail.error=error
        return res.status(500).json(fail)
    }
}
module.exports={
    createnewresumecontroller,
    getuserdata
}