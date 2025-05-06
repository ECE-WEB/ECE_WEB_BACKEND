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
    email:{
        type:String,
        required:true,
        unique:true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']

    },
    password:{
        type:String,
        required:true,
        minlength: 6,
        validate: {
            validator: function (value) {
                return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value);
            },
            message: props => `${props.value} is not a valid password!,Password must be at least 6 characters long and contain both letters and numbers.`
        }
    },
    role:{
        type:String,
        enum:['admin','faculty','alumni','student','superadmin'],
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
