const { markscontroller } = require("../../controllers")
const { ReadExcel } = require("../../middlewares")
const app = require("express").Router()
const {upload} = require("../../utils/index")
app.post('/',upload.single('marks'),ReadExcel,markscontroller.createmarkscontroller)
app.get('/',markscontroller.getmarkscontroller)
module.exports=app
