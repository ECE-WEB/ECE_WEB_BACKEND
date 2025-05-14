const {marksservice} = require("../services/index")
const { success,fail } = require("../utils")
async function createmarkscontroller(req,res){
    try {
        
       
        const marks = await marksservice.createmarksservice(req.excelData,req.body)
        
        success.data=marks
        return res.status(201).json(success)
    } catch (error) {
        fail.error=error.message || error || "Internal Server Error"
        const statusCode  = error.statusCode || 500
        return res.status(statusCode).json(fail)
    }
}
async function getmarkscontroller(req,res){
    try {
        const studentmarks = await marksservice.getmarksservice(req.query)
        success.data=studentmarks
        return res.status(200).json(success)
    } catch (error) {
        fail.error = error.message || error
        return res.status(500).json(fail)
    }
}
async function getmarkscontrollerbyid(req,res){
    try {
        const user_marks = await marksservice.getmarksbyid(req.params)
        success.data = user_marks
        return res.status(200).json(success)
    } catch (error) {
        fail.error = error.message || error
        return res.status(500).json(fail)
    }
}
module.exports={
    createmarkscontroller,
    getmarkscontroller,
    getmarkscontrollerbyid
}
