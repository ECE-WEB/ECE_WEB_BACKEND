const mongoose = require('mongoose');
const AnnoucementsSchema = new mongoose.Schema({
    posted_id:{
        type:mongoose.Schema.Types.ObjectId,
        // ref:'User',
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        enum:['Jobs','Interns','Announcements'],
        required:true

    },
    venue:{
        type:String,
        default: 'To be decided'
        
    
    },
    date:{
        type:Date,
        default:Date.now
    }
})
AnnoucementsSchema.index({ title: 1, date: 1 }, { unique: true });
module.exports=mongoose.model('Annoucements',AnnoucementsSchema)
