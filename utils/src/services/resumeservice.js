const {resumerepository} = require('../repositories/index')
const resumeservice = new resumerepository()
async function createnewresumeservice(data){

    try {
        const filter={

        }
        const query={
            
        }
        
        for(const [key,value] of Object.entries(data)){
            const lowercasekey = key.toLowerCase()
            console.log(lowercasekey,value)
            if(lowercasekey==="user_id"){
                filter.User_id = value
            }
            else if(lowercasekey==="skills"){
                query.$addToSet = {
                    [key] :value
                }

            }
            else{
                query.$push = {
                    
                        ...query.$push,[key]:value
                   
                }
            }
        }
        const document_validation = {
            upsert:true,
            new:true
        }
        console.log(query)
        const newuserresume = await resumeservice.findandcreate([filter,query,document_validation])
        return newuserresume
    } catch (error) {
        throw error
    }

}
async function getdatabyuserid(data){
    try {
        const query = {User_id:data.id}
        const user_data =await resumeservice.find(query)
        return user_data
    } catch (error) {
        throw error
    }
}
module.exports = {
    createnewresumeservice,
    getdatabyuserid
}