const mongoose = require('mongoose')
const SubjectAttendanceSchema = new mongoose.Schema({
    subject_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Subjects'
    },
    total_class_present:{
        type:Number,
        default:0,
    },
    total_class_taken:{
        type:Number,
        default:0
    }

},{_id:false})
const AttendanceSchema = new mongoose.Schema({
    user_id:{
        type:String,
        required:true
    },
    semester1:[SubjectAttendanceSchema],
    semester2:[SubjectAttendanceSchema],
    semester3:[SubjectAttendanceSchema],
    semester4:[SubjectAttendanceSchema],
    semester5:[SubjectAttendanceSchema],
    semester6:[SubjectAttendanceSchema],
    semester7:[SubjectAttendanceSchema],
    semester8:[SubjectAttendanceSchema],

},{timestamps:true})
       
const attendancemodel = mongoose.model('attendance',AttendanceSchema)
module.exports=attendancemodel