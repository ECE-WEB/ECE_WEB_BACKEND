const { attendancecontroller } = require("../../controllers")

const app = require("express").Router()
app.post('/',attendancecontroller.createnewattendanceusercontroller)
app.get('/',attendancecontroller.getallstudentcontroller)
module.exports=app
