const { sectioncontroller } = require("../../controllers")
const { ReadExcel } = require("../../middlewares")
const {upload} = require("../../utils/index")
const app = require("express").Router()
app.post('/',upload.single('section'),ReadExcel,sectioncontroller.createsectioncontroller)
app.get('/',sectioncontroller.getsectioncontroller)
module.exports=app
