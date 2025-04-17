const crudrepository = require("./crudrepository");
const {Section} = require("../models/index")
class sectionrepository extends crudrepository{
    constructor(){
        super(Section)
    }
    async insertall(data){
        try{
            const response = await Section.insertMany(data);
            return response
        }
        catch(error){
            throw error
        }
    }
}
module.exports=sectionrepository
