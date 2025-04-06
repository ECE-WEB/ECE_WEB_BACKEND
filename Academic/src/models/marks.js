const mongoose = require("mongoose")
const SubjectMarksSchema = new mongoose.Schema({ 
    subject_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'subjects',
        required:true
    },
    mid1:{
        type:String,
        default:null,
    },
    mid2:{
        type:String,
        default:null,
    },
    mid3:{
        type:String,
        default:null,
    },
    
    
},{_id:false})

const semesterSchema = new mongoose.Schema({
    subjects: [SubjectMarksSchema]
}, { _id: false });
const MarksSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    semester1:[SubjectMarksSchema],
    semester2:[SubjectMarksSchema],
    semester3:[SubjectMarksSchema],
    semester4:[SubjectMarksSchema],
    semester5:[SubjectMarksSchema],
    semester6:[SubjectMarksSchema],
    semester7:[SubjectMarksSchema],
    semester8:[SubjectMarksSchema],
}, { timestamps: true })
const marksmodel = mongoose.model('marks', MarksSchema)
module.exports=marksmodel
    






