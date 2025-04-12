const mongoose = require('mongoose')
const {envconfig} = require('../controller/index')
async function connectDB(){
    try {
       
        await mongoose.connect(envconfig.MONGO_URI)
        console.log('MongoDB connected')
    } catch (error) {
        console.error('MongoDB connection error:', error)
        process.exit(1)
    }
}
module.exports=connectDB