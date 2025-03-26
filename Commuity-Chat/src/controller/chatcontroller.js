const { chatservice } = require("../services");

async function createnewmessagecontroller(data){
    try {
        const newmessage = await  chatservice.createnewmessageservice(data)
        return newmessage
    } catch (error) {
        console.log('this is error while creating the new message',error)  
        throw error 
    }

}
async function getallmessagecontroller(){
    try {
        const allmessages = await chatservice.getallmessage()
        return allmessages
    }
    catch(error){
        console.log('this is error while getting all messages',error)
        throw error
    }
}
module.exports={
    createnewmessagecontroller,
    getallmessagecontroller
}