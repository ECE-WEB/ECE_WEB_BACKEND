const {Annoucements} = require("../models/index")
async function duplicate_error_response(data){
    try {
        const query = {title:data.title , date:data.date}
        console.log(query,'this is the query')
        const annoucementsdata  = await Annoucements.findOne(query)
        console.log(annoucementsdata,'this is the anoocuments data')
        if(annoucementsdata){
            const error = new Error(`Duplicate entry with title:${data?.title}  and date:${data.date}.Please check once the entred announcement`)
            error.statusCode = 400
            throw error
        } 
    } catch (error) {
        throw error
    }
}
function pastannouncements_error_response(data){
    const now = new Date()
    const tenMinutesAgo = new Date(now.getTime()-10*60*1000)
    if(data.date<tenMinutesAgo){
        const error = new Error('Event time must not be more than 10 minutes in the past')
        error.statusCode=400
        throw error
    }
}
module.exports={
    duplicate_error_response,
    pastannouncements_error_response
}