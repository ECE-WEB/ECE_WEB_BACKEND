const { subjectcontroller } = require("../../controllers")

const app = require("express").Router()
app.post('/',subjectcontroller.createnewsubjectcontroller)
app.get('/',subjectcontroller.getallsubjectscontroller)
module.exports=app
