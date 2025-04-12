const mongoose = require('mongoose')
const ResumeSchema = new mongoose.Schema({
    User_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'    
    },
    Achievements:{
        type:[String],
        default:[]
    },
    Projects:{
        type:[{
            nameofproject:{
                type:String,
                required:true
            },
            techologiesused:{
                type:[String],
                default:[]
            },
            description:{
                type:String,
                required:true
            },
        }],
        _id:false
    }
    ,
    Experince:{
        type:[{
            company:{
                type:String,
                required:true
            },
            position:{
                type:String,
                required:true
            },
            type:{
                type:String,
                required:true
            },
            duration:{
                type:String,
                required:true
            },
            description:{
                type:String,
                required:true
            },
        }],
        _id:false
    },
    Skills:{
        type:[String],
        default:[]
        
    },
    


})
const Resume = mongoose.model('Resume', ResumeSchema)
module.exports = Resume