const {Annoucementsrepository} = require('../repositories/index')
const Annoucementservice = new Annoucementsrepository()
async function createAnnoucements(data){
    try {
        const newannouncement = await Annoucementservice.create(data)
        return newannouncement
    } catch (error) {
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