const Announcement = require("../models/announcement");
const { success } = require("../utils");

module.exports.allAnnouncements = async (req, res) => {
    try {
        let allAnnouncements = await Announcement.find({});
        res.status(200).json({ success: true, announcements: allAnnouncements });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

module.exports.newAnnouncement = (req,res)=>{
    res.status(200).json({
        success: "true",
        message: "can create a new event"
    })
}

module.exports.createAnnouncement = async (req, res) => {
    try {
        let announcement = req.body;
        let new_announcemnt = new Announcement(announcement);
        await new_announcemnt.save();
        res.status(200).json({
            success: "true",
            message: "created Announcement",
            announcement: new_announcemnt
        })
    } catch (err) {
        res.status(500).json({
            success: "false",
            message: "server error",
            error: err
        })
    }
}



// module.exports.showAnnouncement = async (req,res)=>{
//     try {
//         let { id } = req.params;
//         const announcement = await Announcement.findById(id);
//         res.status(200).json({
//             success: "true",
//             announcement: announcement
//         })
//     } catch (err) {
//         res.status(500).json({
//             success: "false",
//             message: "Server error"
//         })
//     }
// }

module.exports.editAnnouncement = async(req,res)=>{
    try {
        let { id } = req.params;
        let announcement = await Announcement.findById(id);
        res.status(200).json({
            success: "true",
            message: "can edit your announcement",
            announcement: announcement
        })
    } catch {
        res.status(500).json({
            success: "false",
            message: "Server error"
        })
    }
}

module.exports.updateAnnouncement = async(req,res)=>{
    try {
        let { id } = req.params;
        let updatedAnnouncement = await Announcement.findByIdAndUpdate(id, { ...req.body });
        await updatedAnnouncement.save();
        res.status(200).json({
            success: "true",
            message: "announcement updated",
            announcement: updatedAnnouncement
        })
    } catch (err) {
        res.status(500).json({
            success: "false",
            message: "server error"
        })
    }
}


module.exports.deleteAnnouncement = async (req,res)=>{
    try {
        let { id } = req.params;
        let deletedAnnouncement = await Announcement.findByIdAndDelete(id);
        console.log("deleted ", deletedAnnouncement);
        res.status(200).json({
            success: "true",
            message: "announcement deleted",
            announcement: deletedAnnouncement
        })
    } catch (err) {
        res.status(500).json({
            success: "false",
            message: "server error"
        })
    }
}