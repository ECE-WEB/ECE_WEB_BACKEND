const { resumecontroller } = require('../../controller');

const app = require('express').Router();
app.post('/',resumecontroller.createnewresumecontroller)
app.get('/:id',resumecontroller.getuserdata)
module.exports=app
