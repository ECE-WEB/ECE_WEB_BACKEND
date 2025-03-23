const { annoucementcontroller } = require('../../controllers')

const app = require('express').Router()
app.post('/',annoucementcontroller.createannoucementscontroller)
app.get('/',annoucementcontroller.getallannoucementscontroller)
app.get('/category',annoucementcontroller.getallAnnoucementsbycategorycontroller)
module.exports=app  