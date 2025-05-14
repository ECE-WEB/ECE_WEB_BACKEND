const { annoucementcontroller } = require('../../controllers')
const {announcementsvalid} = require("../../validations/index")
const {middlewarevalidtions,authMiddleware} = require("../../middleware/index")
const app = require('express').Router()
app.post('/',
    authMiddleware.authMiddleware,
    announcementsvalid.announcementsValidations,
    middlewarevalidtions.annoucementsvalidmiddleware,
    annoucementcontroller.createannoucementscontroller
)
app.get('/',
    authMiddleware.authMiddleware,
    annoucementcontroller.getallannoucementscontroller)
app.get('/category',
    authMiddleware.authMiddleware,
    annoucementcontroller.getallAnnoucementsbycategorycontroller)
module.exports=app  