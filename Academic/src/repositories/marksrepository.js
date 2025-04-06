const crudrepository = require("./crudrepository");
const {Marks} = require("../models/index")
class marksrepository extends crudrepository{
    constructor(){
        super(Marks)
    }
    async bulkcreation(data){
        
        try {
            /*
            used the bulkWrite method to insert multiple documents because when we use to insert a large amount of the data using the InsertOne or bulkWrite is good way to do it 
            https://www.mongodb.com/docs/manual/reference/method/db.collection.bulkWrite/
            */
            const response = await Marks.bulkWrite(data, { ordered: false })
            return response
        } catch (error) {
            throw error
        }
    }
    async createnewusermarks(data){
        try {
             
        } catch (error) {
            
        }
    }
}
module.exports=marksrepository