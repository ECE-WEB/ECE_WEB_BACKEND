const router = require("express").Router()
const checkserver = require("./checkserverrouter")
const marks = require("./marksrouters")
const subjects  = require("./subjectrouters")
const attendance  = require("./attendancerouter")
const section = require("./sectionrouter")
router.use('/checkserver',checkserver)
router.use('/marks',marks)
router.use('/subjects',subjects)
router.use('/attendance',attendance)
router.use('/section',section)
module.exports=router