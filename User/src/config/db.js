const mongoose =  require('mongoose')
const envconfig = require('./envconfig')
async function connectDB(){
    try {
        await mongoose.connect(envconfig.MONGO_URI)
        console.log('Connected To DB')
    } catch (error) {
        console.log('Error In Connecting To DB',error)
       
        
    }
}
module.exports=connectDB