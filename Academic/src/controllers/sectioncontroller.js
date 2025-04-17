const {sectionservice} = require("../services/index")
const { success,fail } = require("../utils/index")
async function createsectioncontroller(req,res){
    try {
        const section_details = await sectionservice.createsectionservice(req.excelData,req.body)
        success.data = section_details
        return res.status(200).json(success)
    } catch (error) {
        fail.error=error.message || error
        return res.status(500).json(fail)
    }
}
async function getsectioncontroller(req,res){
    try {
        const all_section_details = await sectionservice.getallsectiondetails(req.query)
        success.data=all_section_details
        return res.status(200).json(success); 
    } catch (error) {
        fail.message = error.messsage
        fail.error = error
        return res.status(500).json(fail)
    }
}
module.exports={
    createsectioncontroller,
    getsectioncontroller
}
