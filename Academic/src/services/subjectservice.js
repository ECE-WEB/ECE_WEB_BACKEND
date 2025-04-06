const {subjectrepository} = require("../repositories/index")
const subjectservice = new subjectrepository()
async function createnewsubject(data){
    try {
        const newsubject = await subjectservice.create(data)
        return newsubject
    } catch (error) {
        throw error
    }
}
async function getallsubjects(){
    try {
        
        const allsubjects = await subjectservice.find()
        console.log(allsubjects,'this is from getall subjects service')
        return allsubjects
    } catch (error) {
        throw error
    }
}
module.exports={
    createnewsubject,
    getallsubjects
}