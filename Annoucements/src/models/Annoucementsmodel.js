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
        enum:['Jobs','Inters','Annoucements'],
        required:true

    },
    venue:{
        type:String,
        
    
    },
    date:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model('Annoucements',AnnoucementsSchema)
