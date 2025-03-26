const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
    {
    sender_id:{
        type:mongoose.Schema.Types.ObjectId,
        
        required:true
    },
    sender_name:{
        type:String,
        
    },
    sender_role:{
        type:String,
        
    },
    message:{
        type:String,
        required:true
    },
    
   
    },
    { 
        timestamps: true
    }
)
const ChatModel= mongoose.model('Chat',ChatSchema)
module.exports=ChatModel
