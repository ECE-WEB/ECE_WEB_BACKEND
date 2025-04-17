const dotenv = require('dotenv')
dotenv.config()
module.exports={
    PORT:process.env.PORT || 9003,
    MONGO_URI:process.env.MONGO_URI,
    USER_API:process.env.USER_API
    
}