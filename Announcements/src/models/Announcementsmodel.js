const mongoose = require('mongoose');
const AnnouncementsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    category:{
        type: String, 
        enum: ['Jobs', 'Inter', 'Announcements'], 
        required:true
    },
    venu:{
        type:String,
        
    },
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports=mongoose.Schema('Announcements',AnnouncementsSchema)