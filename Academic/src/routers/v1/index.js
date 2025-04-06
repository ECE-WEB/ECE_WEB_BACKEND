const router = require("express").Router()
const checkserver = require("./checkserverrouter")
const marks = require("./marksrouters")
const subjects  = require("./subjectrouters")
router.use('/checkserver',checkserver)
router.use('/marks',marks)
router.use('/subjects',subjects)
module.exports=router