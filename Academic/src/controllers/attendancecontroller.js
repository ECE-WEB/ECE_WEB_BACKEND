const {attendanceservice} = require("../services/index")
const {success,fail } = require("../utils/index")
async function createnewattendanceusercontroller(req,res){
    try {
        const attendance= await attendanceservice.createnewattendaceuserservice(req.body)
        success.data=attendance
        return res.status(201).json(attendance)

    } catch (error) {
        fail.error=error.error
        fail.message=error.message
        const statusCode  = error.statusCode || 500
        return res.status(statusCode).json(fail)
    }
}
async function getallstudentcontroller(req,res){
    try {
        const student_attendance = await attendanceservice.getallstudentattendance(req.query)
        success.data = student_attendance
        return res.status(200).json(success)
    } catch (error) {
        fail.message = error.message
        fail.error  = error 
        return res.status(500).json(fail)
    }
}
module.exports={
    createnewattendanceusercontroller,
    getallstudentcontroller
}