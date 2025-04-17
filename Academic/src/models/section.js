const { default: mongoose } = require("mongoose");

const SemesterSchema = new mongoose.Schema({
    student_id:{
        type:String,
        required:true

    },
    section:{
        type:String,
        required:true
    },
    student_name:{
        type:String,
        
    },
    roll_no:{
        type:Number,
        required:true
    },
    semester:{
        type:Number,
        required:true
    }
})
const sectionmodel = mongoose.model('section',SemesterSchema)
module.exports=sectionmodel