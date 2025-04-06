const {subjectservice} = require("../services/index")
const { success ,fail} = require("../utils")
async function createnewsubjectcontroller(req,res){
    try {
        const newsubject = await subjectservice.createnewsubject(req.body)
        success.data = newsubject
        return res.status(200).json(newsubject)
    } catch (error) {
        fail.error = error.message || error
        return res.status(500).json(fail)        
    }
}
async function getallsubjectscontroller(req,res){
    try {
        const allsubjects = await subjectservice.getallsubjects()
        success.data = allsubjects
        return res.status(200).json(allsubjects)
    } catch (error) {
        fail.error = error.message || error
        return res.status(500).json(fail)       
    }
}
module.exports={
    createnewsubjectcontroller,
    getallsubjectscontroller
}