const router = require('express').Router()
const server = require('./serverrouter')

const announcementController = require("../../controllers/index");

router.use('/server',server)


router.route("/")
    .get(announcementController.allAnnouncements)
    .post(announcementController.createAnnouncement)

router.route("/new")
    .get(announcementController.newAnnouncement)

router.route("/:id/edit")
    .get(announcementController.editAnnouncement)

router.route("/:id")
    // .get(announcementController.showAnnouncement)
    .put(announcementController.updateAnnouncement)
    .delete(announcementController.deleteAnnouncement)

module.exports=router