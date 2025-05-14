const {sectionrepository} = require("../repositories/index")
const sectionservice = new sectionrepository()
async function createsectionservice(xldata,semester){
    
    try {
        const data  =[]
        for(let [key,value] of Object.entries(xldata)){
            
           
                data.push(...value);
            
           
         
        }
        const section_details = await sectionservice.insertall(data)
        return section_details

    }
    catch (error) {
        throw error
    }
}
async function getallsectiondetails(query={}){
    try {
        console.log(query)
        const section_details = await sectionservice.find(query)
        console.log(section_details,'these are section details')
        return section_details
    } catch (error) {
        throw error
    }
}
module.exports={
    createsectionservice,
    getallsectiondetails
}