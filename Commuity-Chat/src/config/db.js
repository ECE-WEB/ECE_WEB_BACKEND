const mongoose = require('mongoose')
const envconfig = require('./envconfig')
async function connect(){
    try {
        await mongoose.connect(envconfig.MONGO_URI)
        console.log('connected to db');
    } catch (error) {
        console.log('failed to connect db',error);
        process.exit(1)
    }
}
module.exports=connect
