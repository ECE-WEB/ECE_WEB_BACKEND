const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    student_id:{
        type:String,
        default:null
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        
    },
    role:{
        type:String,
        enum:['admin','faculty','alumni','student'],
        default:'student'
    }
    
},
{
    timestamps:true
}
)
UserSchema.pre('save',async function (next
    )
    {
        if(!this.isModified('password'))
        {
            return next()
        }
        try {
            this.password = await bcrypt.hash(this.password,10)
            next()
        } catch (error) {
            next(error)
        }
    }
)
const Usermodel = mongoose.model('User',UserSchema)
module.exports = Usermodel
