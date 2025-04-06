const mongoose = require('mongoose')
const SubjectSchema = new mongoose.Schema({
    subject_name:{
        type:String,
        required:true
    }

})
const SubjectsModel = mongoose.model('subjects',SubjectSchema)
module.exports=SubjectsModel