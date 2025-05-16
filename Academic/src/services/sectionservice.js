const {sectionrepository} = require("../repositories/index")
const sectionservice = new sectionrepository()
const {section_error_response,marks_error_response} = require("../errors/index") 
async function createsectionservice(xldata,data){
    try {
        const {
            semester_error_response
        }= marks_error_response
        semester_error_response(data)
        const studentSections= Object.values(xldata).flat()
        const semesterNumber = parseInt(data.semester)
        
        const {
            validate_section_error_response
        }= section_error_response
        
        validate_section_error_response(studentSections)
        const sectiondata = studentSections.map(student=>({
            ...student,
            semester:semesterNumber
        }))
        
        const section_details = await sectionservice.insertall(sectiondata)
        return section_details

    }
    catch (error) {
        throw error
    }
}
async function getallsectiondetails(query={}){
    try {
        const section_details = await sectionservice.find(query)
        return section_details
    } catch (error) {
        throw error
    }
}
module.exports={
    createsectionservice,
    getallsectiondetails
}