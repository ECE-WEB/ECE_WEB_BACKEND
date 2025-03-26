const { chatrepository } = require("../repositories")

const chatservive = new chatrepository()
async function createnewmessageservice(data){
    try {
        console.log(data)
        const newchat = await chatservive.create(data)
        return newchat  
    } catch (error) {
        throw error
    }
}
async function getallmessage(){
    try {
        const allmessage = await chatservive.getmessageinorder()
        return allmessage
    } catch (error) {
        throw error
    }
}
module.exports={
    createnewmessageservice,
    getallmessage

}