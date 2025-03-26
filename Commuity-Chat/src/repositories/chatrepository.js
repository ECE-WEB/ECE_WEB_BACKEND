const CrudRepository = require("./crudrepository");
const {Chat} = require('../models/index')
console.log(Chat)
class chatrepository extends CrudRepository{
    constructor(){
        super(Chat)
    }
    async getmessageinorder(){
        try{
            const response = await Chat.find().sort({ createdAt: 1 });
            console.log(response)
            return response
        }
        catch(error){
            throw error
        }
    }
}
module.exports=chatrepository;
