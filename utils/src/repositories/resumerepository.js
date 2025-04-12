const crudrepositoty = require("./crudrepository");
const { Resume } = require("../models/index");
class resumerepository extends crudrepositoty{
    constructor(){
        super(Resume)
    }
    async findandcreate(query){
       
        try {
            const response = await Resume.findOneAndUpdate(...query)
            return response
        } catch (error) {
            throw error
        }
    }
}
module.exports = resumerepository