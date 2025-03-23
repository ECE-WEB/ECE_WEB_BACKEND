const {annoucementsservice} = require('../services/index')
const { success, fail } = require('../utils')
async function createannoucementscontroller(req,res){
    try {
        const newannouncement= await annoucementsservice.createAnnoucements(req.body)
        success.data=newannouncement
        return res.status(201).json(success)
    } catch (error) {
        fail.error=error
        return res.status(500).json(fail)
    }   
}
async function getallannoucementscontroller(req,res){
    try {
        const allAnnoucements = await annoucementsservice.getallAnnoucements()
        success.data=allAnnoucements
        return res.status(201).json(success)
    } catch (error) {
        console.log(error)
        fail.error=error
        return res.status(500).json(fail)
    }
}
async function getallAnnoucementsbycategorycontroller(req,res){
    try {
        
        const allAnnoucements = await annoucementsservice.getallAnnoucementsbycategory(req.query)
        success.data=allAnnoucements
        return res.status(201).json(success)
    } catch (error) {
        throw error
    }
}
module.exports={
    createannoucementscontroller,
    getallannoucementscontroller,
    getallAnnoucementsbycategorycontroller
}
