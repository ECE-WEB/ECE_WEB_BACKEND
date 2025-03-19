const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const announcementSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    announcer_id:{
        type:Number,
        required:true
    },
    suggestions:{
        type:String,
    },
    file:{
        type:String,
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        enum:["jobs","internships","internal marks","attendance"],
        required:true
    }
}, { timestamps: true })


const AnnouncementModel = mongoose.model("Announcement",announcementSchema);



module.exports = AnnouncementModel;