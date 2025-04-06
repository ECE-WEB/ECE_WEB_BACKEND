const mongoose = require('mongoose')
const envconfig = require('./envconfig')
async function connect(){
    try {
        await mongoose.connect(envconfig.MONGO_URI)
        console.log("MongoDB Connected")
    } catch (error) {
        console.log(error)
    }
}
module.exports=connect
