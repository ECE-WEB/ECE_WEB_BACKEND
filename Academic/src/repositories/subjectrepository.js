const crudrepository = require("./crudrepository")
const {Subjects} = require("../models/index")
class  subjectrepository extends crudrepository{
    constructor(){
        super(Subjects)
    }
} 
module.exports=subjectrepository