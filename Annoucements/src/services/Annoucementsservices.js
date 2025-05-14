const {Annoucementsrepository} = require('../repositories/index')
const Annoucementservice = new Annoucementsrepository()
const {announcementserrors} = require("../errors/index")
async function createAnnoucements(data){
    try {
        const {
            duplicate_error_response,
            pastannouncements_error_response
        } = announcementserrors
        pastannouncements_error_response(data)
        await duplicate_error_response(data)
        const newannouncement = await Annoucementservice.create(data)
        return newannouncement
    } catch (error) {
        if(error.code===11000){
            const error = new Error(`Duplicate entry with title:${data?.title}  and date:${data.date}.Please check once the entred announcement`)
            error.statusCode = 400
            throw error
        }
        throw error
    }
}
async function getallAnnoucements(){
    try {
        const allAnnoucements = await Annoucementservice.getAll()
        return allAnnoucements
    } catch (error) {
        throw error
    }
}
async function getallAnnoucementsbycategory(data){
    try {
        
        const allAnnoucements= await Annoucementservice.getallannouncementbycategoryrepo(data)
        return allAnnoucements
    } catch (error) {
        throw error
    }
}
module.exports = {
    createAnnoucements,
    getallAnnoucements,
    getallAnnoucementsbycategory
}   